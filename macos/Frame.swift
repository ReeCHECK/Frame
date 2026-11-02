import Cocoa
import WebKit
import UniformTypeIdentifiers
import zlib
import AVFoundation
import AVKit

struct FrameError: LocalizedError { let message: String; var errorDescription: String? { message }; init(_ message: String) { self.message = message } }
struct AnimationInfo {
    var width: Int, height: Int, fps: Int, frames: Int
    var seconds: Double=0, nominalFPS: Double=0
    var bitrate=0, sampleRate=0, channels=0
    var duration:Double { seconds>0 ? seconds : fps>0 ? Double(frames)/Double(fps) : 0 }
    var frameRate:Double { nominalFPS>0 ? nominalFPS : Double(fps) }
    var json: [String:Any] { ["width":width,"height":height,"fps":frameRate,"frames":frames,"duration":duration,"bitrate":bitrate,"sampleRate":sampleRate,"channels":channels] }
}
func inspectSVGA(_ input: Data, allowAudio:Bool=false) throws -> AnimationInfo {
    guard !input.isEmpty && input.count <= 64*1024*1024 else { throw FrameError("文件为空或超过 64 MB。") }
    if input.prefix(2) == Data([0x50,0x4b]) { throw FrameError("这是 SVGA 1.x 旧格式；当前支持 SVGA 2.x。请从源工程重新导出。") }
    var expanded = Data(count: 128*1024*1024), length = uLongf(expanded.count)
    let result = expanded.withUnsafeMutableBytes { dest in input.withUnsafeBytes { source in uncompress(dest.bindMemory(to: Bytef.self).baseAddress!, &length, source.bindMemory(to: Bytef.self).baseAddress!, uLong(input.count)) } }
    guard result == Z_OK else { throw FrameError(result == Z_BUF_ERROR ? "解压数据超过 128 MB，请减少素材大小。" : "文件无法读取，请确认它是完整的 SVGA 2.x 文件。") }
    expanded.count = Int(length)
    func fields(_ data: Data, each: (Int,Int,Data?,UInt64?) throws -> Void) throws {
        let bytes = [UInt8](data); var offset = 0
        func integer() throws -> UInt64 {
            var value: UInt64 = 0
            for shift in stride(from:0,through:56,by:7) {
                guard offset < bytes.count else { throw FrameError("SVGA 数据不完整。") }
                let byte = bytes[offset]; offset += 1; value |= UInt64(byte & 127) << shift
                if byte < 128 { return value }
            }
            throw FrameError("SVGA 数值编码无效。")
        }
        while offset < bytes.count {
            let key = try integer(), field = Int(key >> 3), wire = Int(key & 7)
            guard field > 0 else { throw FrameError("SVGA 数据格式无效。") }
            if wire == 0 { try each(field,wire,nil,integer()); continue }
            let size: Int
            if wire == 2 { let n = try integer(); guard n <= UInt64(bytes.count) else { throw FrameError("SVGA 数据长度无效。") }; size = Int(n) }
            else if wire == 5 { size = 4 }
            else if wire == 1 { size = 8 }
            else { throw FrameError("不支持的 SVGA 编码。") }
            guard size <= bytes.count-offset else { throw FrameError("SVGA 数据不完整。") }
            // Large image blobs are skipped without copying.
            let part = (wire == 5 || field == 2) ? Data(bytes[offset..<offset+size]) : nil
            try each(field,wire,part,nil); offset += size
        }
    }
    var params: Data?, audio = false
    try fields(expanded) { field,wire,data,_ in
        if field == 2 && wire == 2 { params = data }
        if field == 5 { audio = true }
    }
    guard !audio || allowAudio else { throw FrameError("检测到音轨。当前只支持无音轨动画，避免转换后丢失声音。") }
    guard let params else { throw FrameError("动画参数缺失。") }
    var w: Float = 0,h: Float = 0,fps = 0,count = 0
    try fields(params) { field,wire,data,number in
        if wire == 5, let data {
            let bits = data.withUnsafeBytes { $0.loadUnaligned(as: UInt32.self) }.littleEndian
            if field == 1 { w = Float(bitPattern:bits) }; if field == 2 { h = Float(bitPattern:bits) }
        }
        if wire == 0, let number, number <= UInt64(Int.max) { if field == 3 { fps = Int(number) }; if field == 4 { count = Int(number) } }
    }
    guard w.isFinite && h.isFinite && w.rounded() == w && h.rounded() == h && w >= 1 && h >= 1 && w <= 4096 && h <= 4096 && fps >= 1 && fps <= 120 && count > 0 && count <= 3000 && Double(w)*Double(h)*Double(count) <= 1_000_000_000 else { throw FrameError("动画超出支持范围：最大 4096×4096、120 fps、3000 帧，总像素×帧数不超过 10 亿。") }
    return AnimationInfo(width:Int(w),height:Int(h),fps:fps,frames:count)
}

@MainActor final class Entry {
    let id = UUID().uuidString, url: URL, bytes: Int, tool:String
    var info: AnimationInfo?, status = "loading", stage = "读取动画", progress = 0, error = "", output: URL?, outputBytes = 0
    var resultNote="",resultFrames=0,resultSettingsKey=""
    init(url: URL, bytes: Int, tool:String) { self.url=url;self.bytes=bytes;self.tool=tool }
    var json: [String:Any] {
        var result: [String:Any] = ["id":id,"name":url.lastPathComponent,"bytes":bytes,"status":status,"stage":stage,"progress":progress,"error":error,"outputBytes":outputBytes,"tool":tool,"resultNote":resultNote,"resultFrames":resultFrames,"resultSettingsKey":resultSettingsKey]
        if let info { result["info"] = info.json }; if let output { result["output"] = output.path }
        return result
    }
}

@MainActor final class RenderEngine: NSObject, WKNavigationDelegate {
    let view: WKWebView
    var waiter: CheckedContinuation<Void,Error>?
    init(root: URL, host:NSView?=nil) {
        let config=WKWebViewConfiguration(); config.websiteDataStore = .nonPersistent();config.mediaTypesRequiringUserActionForPlayback=[]
        view=WKWebView(frame:NSRect(x:0,y:0,width:800,height:800),configuration:config)
        super.init(); view.navigationDelegate=self
        if let host { view.frame=host.bounds;host.addSubview(view,positioned:.below,relativeTo:nil) }
    }
    func load(root: URL) async throws {
        try await withCheckedThrowingContinuation { (c: CheckedContinuation<Void,Error>) in
            waiter=c;view.loadFileURL(root.appendingPathComponent("web/renderer.html"),allowingReadAccessTo:root)
        }
    }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) { waiter?.resume();waiter=nil }
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { waiter?.resume(throwing:error);waiter=nil }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { waiter?.resume(throwing:error);waiter=nil }
    func evaluate(_ code: String, arguments: [String:Any]) async throws -> Any {
        try await withCheckedThrowingContinuation { continuation in
            var settled=false
            let timer=Timer.scheduledTimer(withTimeInterval:60,repeats:false) { _ in
                guard !settled else { return };settled=true
                continuation.resume(throwing:FrameError("动画解码或渲染超时，请检查 PAG 是否使用了不受支持的视频或字体资源。"))
            }
            view.callAsyncJavaScript(code, arguments:arguments, in:nil, in:.page) { result in
                guard !settled else { return };settled=true;timer.invalidate();continuation.resume(with:result)
            }
        }
    }
    func prepare(_ data: Data, pag:Bool=false, root:URL?=nil) async throws -> [String:Any] {
        var args:[String:Any] = ["base64":data.base64EncodedString()]
        if pag,let root { args["wasm"] = try Data(contentsOf:root.appendingPathComponent("vendor/libpag.wasm")).base64EncodedString() }
        let result: Any = try await evaluate(pag ? "return await loadPAG(base64,wasm)":"return await loadAnimation(base64)", arguments:args)
        guard let info=result as? [String:Any] else { throw FrameError("播放器没有返回动画参数。") };return info
    }
    func frame(_ index: Int, progress:Double=0) async throws -> Data {
        let result: Any = try await evaluate("return await renderFrame(index,progress)", arguments:["index":index,"progress":progress])
        guard let png=result as? String,let data=Data(base64Encoded:png) else { throw FrameError("无法渲染第 \(index+1) 帧。") };return data
    }
}

final class EncoderLog: @unchecked Sendable {
    private let lock=NSLock(); private var content=""
    func append(_ s:String) { lock.lock();defer{lock.unlock()};content=String((content+s).suffix(2400)) }
    var text:String { lock.lock();defer{lock.unlock()};return content }
}

@MainActor final class DropWebView: WKWebView {
    var onFiles: (([URL])->Void)?
    var onDrag: ((Bool)->Void)?
    override func draggingEntered(_ sender: NSDraggingInfo) -> NSDragOperation {
        let urls=sender.draggingPasteboard.readObjects(forClasses:[NSURL.self],options:[.urlReadingFileURLsOnly:true]) as? [URL] ?? []
        if !urls.isEmpty { onDrag?(true);return .copy };return super.draggingEntered(sender)
    }
    override func draggingExited(_ sender: NSDraggingInfo?) { onDrag?(false) }
    override func concludeDragOperation(_ sender: NSDraggingInfo?) { onDrag?(false) }
    override func prepareForDragOperation(_ sender: NSDraggingInfo) -> Bool { true }
    override func performDragOperation(_ sender: NSDraggingInfo) -> Bool {
        let urls=sender.draggingPasteboard.readObjects(forClasses:[NSURL.self],options:[.urlReadingFileURLsOnly:true]) as? [URL] ?? []
        onDrag?(false);guard !urls.isEmpty else { return super.performDragOperation(sender) };onFiles?(urls);return true
    }
}

@MainActor final class App: NSObject, NSApplicationDelegate, NSWindowDelegate, WKScriptMessageHandler, WKNavigationDelegate {
    var window: NSWindow!, web: DropWebView!, root: URL!
    var entries: [Entry]=[], selected: String?, outputDir: URL!, busy=false, stopRequested=false
    var encoder: Process?, engine: RenderEngine?, tempDir: URL?, uiReady=false, pendingURLs: [URL]=[]
    var smokeInput: URL?, smokeOutput: URL?, smokeRun=false, smokeTimer: Timer?
    var activeTask: Task<Void,Never>?
    var activeTool="svga-pag",settings=ToolSettings()
    var mediaWindow:NSWindow?,mediaPlayer:AVPlayer?
    var lastSmokeStatus="",smokeReexported=false
    func applicationDidFinishLaunching(_ notification: Notification) {
        root=Bundle.main.resourceURL!
        let args=CommandLine.arguments
        if let saved=UserDefaults.standard.dictionary(forKey:"toolSettings.v32") { applySettings(saved) }
        if let i=args.firstIndex(of:"--smoke-test"), i+1<args.count { smokeInput=URL(fileURLWithPath:args[i+1]);smokeRun=true }
        if let i=args.firstIndex(of:"--output"), i+1<args.count { smokeOutput=URL(fileURLWithPath:args[i+1]) }
        if let i=args.firstIndex(of:"--tool"),i+1<args.count,toolExtensions[args[i+1]] != nil { activeTool=args[i+1] }
        else if let smokeInput { activeTool=["mp3":"mp3","mp4":"mp4-png","pag":"pag-gif"][smokeInput.pathExtension.lowercased()] ?? "svga-pag" }
        if let i=args.firstIndex(of:"--quality"),i+1<args.count,["small","balanced"].contains(args[i+1]) { settings.quality=args[i+1];settings.audioQuality=args[i+1]=="small" ? 0:50 }
        if let i=args.firstIndex(of:"--gif-fps"),i+1<args.count,let n=Int(args[i+1]),[5,10,12,15,20,24,25,30].contains(n) { settings.gifFPS=n }
        if let i=args.firstIndex(of:"--gif-background"),i+1<args.count,["white","black","transparent"].contains(args[i+1]) { settings.background=args[i+1] }
        for (flag,allowed) in [("--png-fps",[0,1,5,10,15,24,30,60]),("--png-size",[0,480,720,1080,1920]),("--gif-size",[0,240,320,480,720,1080])] {
            if let i=args.firstIndex(of:flag),i+1<args.count,let n=Int(args[i+1]),allowed.contains(n) { if flag=="--png-fps" {settings.pngFPS=n};if flag=="--png-size" {settings.pngSize=n};if flag=="--gif-size" {settings.gifSize=n} }
        }
        if let i=args.firstIndex(of:"--output-quality"),i+1<args.count,let value=Int(args[i+1]),(0...100).contains(value) {
            if activeTool=="svga-pag" {settings.pagQuality=value};if activeTool.hasSuffix("-gif") {settings.gifQuality=value};if activeTool=="mp3" {settings.audioQuality=value}
        }
        let saved=UserDefaults.standard.string(forKey:"outputDirectory")
        outputDir=smokeOutput ?? saved.map{URL(fileURLWithPath:$0)} ?? FileManager.default.urls(for:.downloadsDirectory,in:.userDomainMask)[0].appendingPathComponent("Frame Exports",isDirectory:true)
        if !smokeRun { pendingURLs += args.dropFirst().filter { ["svga","pag","mp3","mp4"].contains(URL(fileURLWithPath:$0).pathExtension.lowercased()) }.map { URL(fileURLWithPath:$0) } }
        setupMenu()
        let configuration=WKWebViewConfiguration();configuration.websiteDataStore = .nonPersistent();configuration.userContentController.add(self,name:"frame")
        web=DropWebView(frame:.zero,configuration:configuration);web.navigationDelegate=self;web.setValue(false,forKey:"drawsBackground")
        web.onFiles={ [weak self] urls in self?.addFiles(urls) };web.onDrag={ [weak self] active in self?.send(["type":"drag","active":active]) };web.registerForDraggedTypes([.fileURL])
        let available=NSScreen.main?.visibleFrame ?? NSRect(x:0,y:0,width:1280,height:800)
        let initialWidth=min(1240,max(860,available.width-24)),initialHeight=min(810,max(520,available.height-54))
        window=NSWindow(contentRect:NSRect(x:0,y:0,width:initialWidth,height:initialHeight),styleMask:[.titled,.closable,.miniaturizable,.resizable],backing:.buffered,defer:false)
        window.title="Frame — 本地媒体工具箱";window.minSize=NSSize(width:min(900,initialWidth),height:min(560,initialHeight+28));window.center();window.delegate=self
        window.backgroundColor=NSColor(calibratedWhite:0.966,alpha:1);window.contentView=web
        window.titlebarAppearsTransparent=true;window.isReleasedWhenClosed=false
        web.loadFileURL(root.appendingPathComponent("web/index.html"),allowingReadAccessTo:root)
        if !smokeRun { window.makeKeyAndOrderFront(nil);NSApp.activate(ignoringOtherApps:true) }
        else { window.alphaValue=0.01;window.ignoresMouseEvents=true;window.orderBack(nil);smokeTimer=Timer.scheduledTimer(withTimeInterval:1200,repeats:false) { _ in fputs("SMOKE FAILED: timeout\n",stderr);exit(2) } }
    }
    func setupMenu() {
        let main=NSMenu()
        let appItem=NSMenuItem();main.addItem(appItem);let appMenu=NSMenu();appItem.submenu=appMenu
        appMenu.addItem(withTitle:"关于 Frame",action:#selector(about),keyEquivalent:"")
        appMenu.addItem(.separator());appMenu.addItem(withTitle:"退出 Frame",action:#selector(NSApplication.terminate(_:)),keyEquivalent:"q")
        let fileItem=NSMenuItem();main.addItem(fileItem);let fileMenu=NSMenu(title:"文件");fileItem.submenu=fileMenu
        fileMenu.addItem(withTitle:"添加 SVGA…",action:#selector(chooseFiles),keyEquivalent:"o")
        let folder=fileMenu.addItem(withTitle:"选择输出位置…",action:#selector(chooseOutput),keyEquivalent:"o");folder.keyEquivalentModifierMask=[.command,.shift]
        fileMenu.addItem(.separator());fileMenu.addItem(withTitle:"开始转换",action:#selector(startAll),keyEquivalent:"\r")
        fileMenu.addItem(withTitle:"关闭窗口",action:#selector(NSWindow.performClose(_:)),keyEquivalent:"w")
        let editItem=NSMenuItem();main.addItem(editItem);let edit=NSMenu(title:"编辑");editItem.submenu=edit
        edit.addItem(withTitle:"拷贝",action:#selector(NSText.copy(_:)),keyEquivalent:"c");edit.addItem(withTitle:"粘贴",action:#selector(NSText.paste(_:)),keyEquivalent:"v");edit.addItem(withTitle:"全选",action:#selector(NSText.selectAll(_:)),keyEquivalent:"a")
        let helpItem=NSMenuItem();main.addItem(helpItem);let help=NSMenu(title:"帮助");helpItem.submenu=help
        help.addItem(withTitle:"使用说明",action:#selector(showHelp),keyEquivalent:"?")
        NSApp.mainMenu=main
        for menu in [appMenu,fileMenu,help] { for item in menu.items where item.action != #selector(NSApplication.terminate(_:)) && item.action != #selector(NSWindow.performClose(_:)) { item.target=self } }
    }
    @objc func about() { let alert=NSAlert();alert.messageText="Frame";alert.informativeText="本地媒体工具箱 3.2\nSVGA / PAG / MP3 / MP4\n本地处理，无需 Node.js 或 Chrome。\n基于 SVGAPlayer-Web 与腾讯 PAGConvertor。";alert.addButton(withTitle:"好");alert.runModal() }
    @objc func showHelp() { send(["type":"help"]) }
    @objc func chooseFiles() {
        let panel=NSOpenPanel();panel.title="添加文件 · \(toolNames[activeTool] ?? "Frame")";panel.prompt="添加";panel.allowsMultipleSelection=true;panel.canChooseDirectories=false
        panel.allowedContentTypes=[UTType(filenameExtension:toolExtensions[activeTool] ?? "svga") ?? .data]
        panel.beginSheetModal(for:window) { [weak self] response in if response == .OK { self?.addFiles(panel.urls) } }
    }
    @objc func chooseOutput() {
        guard !busy else { return }
        let panel=NSOpenPanel();panel.title="选择输出位置";panel.prompt="选择此文件夹";panel.canChooseDirectories=true;panel.canChooseFiles=false;panel.canCreateDirectories=true;panel.directoryURL=outputDir
        panel.beginSheetModal(for:window) { [weak self] response in
            guard response == .OK,let url=panel.url,let self else { return }
            self.outputDir=url;UserDefaults.standard.set(url.path,forKey:"outputDirectory");self.snapshot();self.toast("输出位置已更新")
        }
    }
    func application(_ application: NSApplication, open urls: [URL]) { if uiReady { addFiles(urls) } else { pendingURLs += urls } }
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
    func applicationShouldHandleReopen(_ sender:NSApplication,hasVisibleWindows flag:Bool)->Bool { window.makeKeyAndOrderFront(nil);NSApp.activate(ignoringOtherApps:true);return true }
    func windowShouldClose(_ sender:NSWindow)->Bool { if sender===window { NSApp.terminate(nil);return false };return true }
    func windowWillClose(_ notification:Notification) { if let closed=notification.object as? NSWindow,closed===mediaWindow { mediaPlayer?.pause();mediaPlayer=nil;mediaWindow=nil } }
    func applicationShouldTerminate(_ sender: NSApplication) -> NSApplication.TerminateReply {
        guard busy else { return .terminateNow }
        let alert=NSAlert();alert.messageText="停止转换并退出？";alert.informativeText="正在转换的文件将停止，已经完成的结果会保留。";alert.addButton(withTitle:"继续转换");alert.addButton(withTitle:"停止并退出")
        return alert.runModal() == .alertSecondButtonReturn ? .terminateNow : .terminateCancel
    }
    func applicationWillTerminate(_ notification: Notification) { mediaPlayer?.pause(); if encoder?.isRunning == true { encoder?.terminate() };if let tempDir { try? FileManager.default.removeItem(at:tempDir) } }
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy)->Void) {
        if let scheme=navigationAction.request.url?.scheme, !["file","about","data","blob"].contains(scheme) { decisionHandler(.cancel) } else { decisionHandler(.allow) }
    }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { if smokeRun { failSmoke(error.localizedDescription) } }
    func send(_ payload: [String:Any]) { guard uiReady else { return };web.callAsyncJavaScript("window.receive(payload)",arguments:["payload":payload],in:nil,in:.page,completionHandler:nil) }
    func snapshot() {
        if smokeRun,let e=entries.first { let status=e.status+" "+e.stage+" \(e.progress/10*10)%";if status != lastSmokeStatus { print(status);fflush(stdout);lastSmokeStatus=status } }
        send(["type":"state","files":entries.map{$0.json},"selectedId":selected ?? "","outputDir":outputDir.path,"busy":busy,"cancelRequested":stopRequested,"activeTool":activeTool,"settings":settings.json]) }
    func toast(_ text: String) { send(["type":"toast","message":text]) }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.frameInfo.isMainFrame, let body=message.body as? [String:Any],let action=body["action"] as? String else { return }
        switch action {
        case "ready":
            uiReady=true;snapshot()
            if let smokeInput { addFiles([smokeInput]) };if !pendingURLs.isEmpty { let urls=pendingURLs;pendingURLs=[];addFiles(urls) }
        case "chooseFiles":chooseFiles()
        case "setTool":if let tool=body["tool"] as? String { switchTool(tool) }
        case "settings":updateSettings(body)
        case "previewMedia":if let id=body["id"] as? String { previewMedia(id:id,result:body["result"] as? Bool ?? false) }
        case "previewResult":if let id=body["id"] as? String,let e=entries.first(where:{$0.id==id}),let url=e.output,url.pathExtension=="gif",let data=try? Data(contentsOf:url),data.count<=128*1024*1024 { send(["type":"mediaPreview","id":id,"kind":"gif-result","name":url.lastPathComponent,"info":e.info?.json ?? [:],"poster":data.base64EncodedString()]) }
        case "chooseOutput":chooseOutput()
        case "select":if let id=body["id"] as? String { select(id) }
        case "start":startAll()
        case "cancel":cancel()
        case "retry":if !busy,let id=body["id"] as? String,let e=entries.first(where:{$0.id==id}),e.info != nil { e.error="";start(ids:[id]) }
        case "remove":if let id=body["id"] as? String,let e=entries.first(where:{$0.id==id}),!["running","queued"].contains(e.status) { entries.removeAll{$0.id==id};if selected==id { selected=nil;send(["type":"clearPreview"]);if let next=entries.first(where:{$0.tool==activeTool}) { select(next.id) } };snapshot() }
        case "clearDone":entries.removeAll{$0.status=="done" && $0.tool==activeTool};if !entries.contains(where:{$0.id==selected}) { selected=nil;send(["type":"clearPreview"]);if let first=entries.first(where:{$0.tool==activeTool}) { select(first.id) } };snapshot()
        case "reveal":if let id=body["id"] as? String,let url=entries.first(where:{$0.id==id})?.output { NSWorkspace.shared.activateFileViewerSelecting([url]) }
        case "openFolder":if FileManager.default.fileExists(atPath:outputDir.path) { NSWorkspace.shared.open(outputDir) } else { toast("首次转换完成后会创建输出文件夹") }
        case "previewError":toast("预览无法加载，转换前请确认源文件可正常播放")
        default:break
        }
    }
    func addFiles(_ urls: [URL]) {
        var added:[Entry]=[],ignored=0
        for url in urls {
            let ext=url.pathExtension.lowercased()
            guard ["svga","pag","mp3","mp4"].contains(ext) else { ignored += 1;continue }
            let tool:String=ext=="svga" ? (activeTool=="svga-gif" ? "svga-gif":"svga-pag") : (["pag":"pag-gif","mp3":"mp3","mp4":"mp4-png"][ext] ?? activeTool)
            guard !entries.contains(where:{$0.url.standardizedFileURL==url.standardizedFileURL && $0.tool==tool}) else { continue }
            guard entries.count<100 else { ignored += 1;continue }
            let size=(try? url.resourceValues(forKeys:[.fileSizeKey]).fileSize) ?? 0
            let e=Entry(url:url,bytes:size,tool:tool);entries.append(e);added.append(e)
        }
        if ignored>0 { toast("已跳过 \(ignored) 个不支持或超出队列上限的文件") }
        if let first=added.first { activeTool=first.tool;selected=first.id };snapshot()
        Task {
            for e in added {
                do {
                    guard e.bytes>0 && e.bytes <= (["mp3","mp4-png"].contains(e.tool) ? 2_147_483_648:e.tool=="pag-gif" ? 256*1024*1024:64*1024*1024) else { throw FrameError("文件为空或超出大小限制；音视频最大 2 GB，PAG 最大 256 MB，SVGA 最大 64 MB。") }
                    let info:AnimationInfo
                    if e.tool=="pag-gif" {
                        let renderer=RenderEngine(root:root,host:web);defer { renderer.view.removeFromSuperview() };try await renderer.load(root:root)
                        let data=try Data(contentsOf:e.url)
                        guard String(data:data.prefix(3),encoding:.ascii)=="PAG" else { throw FrameError("不是有效的 PAG 文件。") }
                        let result=try await renderer.prepare(data,pag:true,root:root)
                        let w=(result["width"] as? NSNumber)?.intValue ?? 0,h=(result["height"] as? NSNumber)?.intValue ?? 0,fps=(result["fps"] as? NSNumber)?.doubleValue ?? 0,duration=(result["duration"] as? NSNumber)?.doubleValue ?? 0
                        guard w>0 && h>0 && w<=4096 && h<=4096 && fps>0 && fps<=120 && duration>0 && duration<=600 else { throw FrameError("PAG 参数无效或超出范围。") }
                        info=AnimationInfo(width:w,height:h,fps:Int(fps.rounded()),frames:Int(ceil(duration*fps)),seconds:duration,nominalFPS:fps)
                    } else if ["mp3","mp4-png"].contains(e.tool) { info=try await inspectMedia(e.url,kind:e.tool) }
                    else { let url=e.url,allow=e.tool=="svga-gif";info=try await Task.detached(priority:.userInitiated) { try inspectSVGA(Data(contentsOf:url),allowAudio:allow) }.value }
                    guard entries.contains(where:{$0.id==e.id}) else { continue }
                    e.info=info;e.status="ready";e.stage="等待处理"
                    if selected==e.id { loadPreview(e) }
                } catch { e.status="error";e.error=error.localizedDescription;e.stage="无法读取" }
                snapshot()
            }
            if smokeRun { guard entries.contains(where:{$0.status=="ready"}) else { failSmoke(entries.first?.error ?? "no input");return };startAll() }
        }
    }
    func select(_ id:String) { guard let e=entries.first(where:{$0.id==id}) else { return };selected=id;activeTool=e.tool;snapshot();loadPreview(e) }
    func loadPreview(_ e:Entry) {
        guard let info=e.info else { send(["type":"clearPreview"]);return }
        if ["mp3","mp4-png"].contains(e.tool) {
            var payload:[String:Any] = ["type":"mediaPreview","id":e.id,"kind":e.tool,"name":e.url.lastPathComponent,"info":info.json]
            if e.tool=="mp4-png" {
                let generator=AVAssetImageGenerator(asset:AVURLAsset(url:e.url));generator.appliesPreferredTrackTransform=true;generator.maximumSize=NSSize(width:1000,height:1000)
                if let image=try? generator.copyCGImage(at:CMTime(seconds:min(1,info.duration*0.3),preferredTimescale:600),actualTime:nil),let data=NSBitmapImageRep(cgImage:image).representation(using:.png,properties:[:]) { payload["poster"]=data.base64EncodedString() }
            }
            send(payload);return
        }
        guard let data=try? Data(contentsOf:e.url) else { send(["type":"clearPreview"]);return }
        var payload:[String:Any] = ["type":"preview","id":e.id,"name":e.url.lastPathComponent,"base64":data.base64EncodedString(),"kind":e.tool]
        if e.tool=="pag-gif" { payload["wasm"]=(try? Data(contentsOf:root.appendingPathComponent("vendor/libpag.wasm")).base64EncodedString()) ?? "" }
        send(payload)
    }
    @objc func startAll() {
        let candidates=entries.filter { $0.tool==activeTool && ($0.status=="ready" || ($0.status=="done" && $0.resultSettingsKey != settings.fingerprint($0.tool))) }
        if !candidates.isEmpty { start(ids:candidates.map{$0.id}) }
        else if let e=entries.first(where:{$0.id==selected && $0.tool==activeTool && $0.status=="done"}) { start(ids:[e.id]) }
        else { toast("先添加待处理的文件") }
    }
    func cancel() { guard busy else { return };stopRequested=true;if encoder?.isRunning == true { encoder?.terminate() };snapshot() }
    func start(ids:[String]) {
        guard !busy else { return }
        let jobs=entries.filter{ids.contains($0.id) && $0.info != nil};guard !jobs.isEmpty else { toast("先添加待处理的文件");return }
        busy=true;stopRequested=false
        for e in jobs { e.status="queued";e.stage="等待转换";e.error="";e.progress=0 };snapshot()
        activeTask=Task {
            var succeeded=0,failed=0
            for e in jobs {
                if stopRequested { e.status="ready";e.stage="等待转换";continue }
                e.status="running";e.stage="准备渲染";snapshot()
                do { try await convert(e);e.resultSettingsKey=settings.fingerprint(e.tool);e.status="done";e.stage="转换完成";e.progress=100;succeeded += 1 }
                catch { if stopRequested { e.status="cancelled";e.stage="已停止";e.error="转换已停止，可重新转换。" } else { e.status="error";e.stage="转换失败";e.error=error.localizedDescription;failed += 1 } }
                snapshot()
            }
            let wasStopped=stopRequested;busy=false;stopRequested=false;snapshot()
            toast(wasStopped ? "已停止，已导出的文件已保留" : "已完成 \(succeeded) 个文件"+(failed>0 ? "，\(failed) 个失败" : "，已保存到输出文件夹"))
            if smokeRun {
                if failed>0 || succeeded==0 { failSmoke(entries.first?.error ?? "conversion failed") }
                else {
                    let output=entries.first?.output?.path ?? "";print("SMOKE PASSED: \(output)");fflush(stdout)
                    let args=CommandLine.arguments
                    if !smokeReexported,let i=args.firstIndex(of:"--smoke-reexport-quality"),i+1<args.count,let value=Int(args[i+1]),(0...100).contains(value) {
                        smokeReexported=true
                        if activeTool=="svga-pag" {settings.pagQuality=value};if activeTool.hasSuffix("-gif") {settings.gifQuality=value};if activeTool=="mp3" {settings.audioQuality=value}
                        print("SMOKE REEXPORT: \(value)%");startAll();return
                    }
                    smokeTimer?.invalidate();NSApp.terminate(nil)
                }
            }
        }
    }
    func convertSVGAToPAG(_ e:Entry) async throws {
        guard let info=e.info else { throw FrameError("缺少动画参数。") }
        let temp=FileManager.default.temporaryDirectory.appendingPathComponent("frame-"+UUID().uuidString,isDirectory:true),frames=temp.appendingPathComponent("frames",isDirectory:true)
        try FileManager.default.createDirectory(at:frames,withIntermediateDirectories:true);tempDir=temp
        defer { engine?.view.removeFromSuperview();engine=nil;encoder=nil;tempDir=nil;try? FileManager.default.removeItem(at:temp) }
        let renderer=RenderEngine(root:root,host:web);engine=renderer
        try await renderer.load(root:root)
        let data=try Data(contentsOf:e.url),actual=try await renderer.prepare(data)
        for (key,value) in [("width",info.width),("height",info.height),("fps",info.fps),("frames",info.frames)] { guard (actual[key] as? NSNumber)?.intValue==value else { throw FrameError("播放器读取的参数不一致，已停止转换。") } }
        for index in 0..<info.frames {
            if stopRequested { throw CancellationError() }
            let png=try await renderer.frame(index)
            try png.write(to:frames.appendingPathComponent(String(format:"%06d.png",index)))
            e.progress=5+Int(Double(index+1)/Double(info.frames)*69);e.stage="渲染画面 · \(index+1)/\(info.frames) 帧"
            if index%2==0 || index+1==info.frames { snapshot() }
        }
        if stopRequested { throw CancellationError() }
        e.stage="编码 PAG";e.progress=75;snapshot()
        try await encode(frames:frames,fps:info.fps,entry:e)
        e.resultNote=(settings.pagQuality==0 ? "小体积：沿用旧版视频压缩。":"均衡调节：适度提高视频编码品质，改善幅度取决于源素材。")+" 保留原尺寸、帧率和透明背景；原图层会合并。"
        if stopRequested { throw CancellationError() }
        let pag=temp.appendingPathComponent("frames.pag"),result=try Data(contentsOf:pag)
        guard result.count>4,String(data:result.prefix(3),encoding:.ascii)=="PAG" else { throw FrameError("转换器没有生成有效的 PAG 文件。") }
        do { try FileManager.default.createDirectory(at:outputDir,withIntermediateDirectories:true) } catch { throw FrameError("无法创建输出文件夹。请点击“更改…”选择有写入权限的位置后重试。") }
        let stem=e.url.deletingPathExtension().lastPathComponent
        var target=outputDir.appendingPathComponent(stem+".pag"),suffix=1
        while FileManager.default.fileExists(atPath:target.path) { target=outputDir.appendingPathComponent(stem+" (\(suffix)).pag");suffix += 1 }
        do { try FileManager.default.copyItem(at:pag,to:target) } catch { throw FrameError("无法保存 PAG，请更换输出位置或检查剩余磁盘空间后重试。") };e.output=target;e.outputBytes=result.count
    }
    func encode(frames:URL,fps:Int,entry:Entry) async throws {
        let process=Process(),pipe=Pipe(),log=EncoderLog()
        // Keep the converter's transient encoder sessions outside the signed app bundle.
        let bin=frames.deletingLastPathComponent().appendingPathComponent("encoder-bin",isDirectory:true)
        let helper=bin.appendingPathComponent("H264EncoderTools",isDirectory:true)
        try FileManager.default.createDirectory(at:helper,withIntermediateDirectories:true)
        for name in ["PAGConvertor","H264EncoderTools/H264EncoderTools","H264EncoderTools/H264EncoderOriginal"] {
            try FileManager.default.copyItem(at:root.appendingPathComponent("bin/"+name),to:bin.appendingPathComponent(name))
        }
        process.executableURL=bin.appendingPathComponent("PAGConvertor");process.arguments=[frames.path,String(fps)];process.currentDirectoryURL=bin
        var environment=ProcessInfo.processInfo.environment
        environment["FRAME_PAG_QUALITY"]=String(80+Int((Double(settings.pagQuality)*18/100).rounded()))
        process.environment=environment;process.standardOutput=pipe;process.standardError=pipe
        pipe.fileHandleForReading.readabilityHandler={ [weak self,weak entry] handle in
            let data=handle.availableData;guard !data.isEmpty else { handle.readabilityHandler=nil;return }
            let text=String(decoding:data,as:UTF8.self);log.append(text)
            if let regex=try? NSRegularExpression(pattern:"\\[(\\d+)%\\]"),let match=regex.matches(in:text,range:NSRange(text.startIndex...,in:text)).last,let range=Range(match.range(at:1),in:text),let percent=Int(text[range]) {
                Task { @MainActor in guard let self,let entry,entry.status=="running" else { return };entry.progress=min(99,75+percent*24/100);self.snapshot() }
            }
        }
        encoder=process;try process.run();let start=Date()
        while process.isRunning {
            if stopRequested { process.terminate() }
            if Date().timeIntervalSince(start)>1200 { process.terminate();throw FrameError("编码超过 20 分钟，请减小素材尺寸后重试。") }
            try await Task.sleep(nanoseconds:80_000_000)
        }
        pipe.fileHandleForReading.readabilityHandler=nil
        guard !stopRequested else { throw CancellationError() }
        guard process.terminationStatus==0 else { throw FrameError("PAG 编码失败。\n"+log.text.replacingOccurrences(of:"\u{8}",with:"").suffix(350)) }
    }
    func failSmoke(_ error:String) { fputs("SMOKE FAILED: \(error)\n",stderr);exit(1) }
}

import AVFoundation
import AVKit

struct ToolSettings {
    var quality="balanced", gifFPS=15, gifSize=480, background="white", pngFPS=0, pngSize=0
    var pagQuality=0,gifQuality=50,audioQuality=50
    func fingerprint(_ tool:String)->String {
        switch tool {
        case "svga-pag":return "pag-video:\(pagQuality)"
        case "mp3":return "mp3:\(audioQuality)"
        case "svga-gif","pag-gif":return "gif:\(gifQuality):\(gifFPS):\(gifSize):\(background)"
        case "mp4-png":return "png:\(pngFPS):\(pngSize)"
        default:return tool
        }
    }
    var json:[String:Any] { ["quality":quality,"gifFPS":gifFPS,"gifSize":gifSize,"background":background,"pngFPS":pngFPS,"pngSize":pngSize,"pagQuality":pagQuality,"gifQuality":gifQuality,"audioQuality":audioQuality] }
}
let toolExtensions=["svga-pag":"svga","svga-gif":"svga","pag-gif":"pag","mp3":"mp3","mp4-png":"mp4"]
let toolNames=["svga-pag":"SVGA → PAG","svga-gif":"SVGA → GIF","pag-gif":"PAG → GIF","mp3":"MP3 压缩","mp4-png":"MP4 → PNG 序列"]

func inspectMedia(_ url:URL,kind:String) async throws -> AnimationInfo {
    let asset=AVURLAsset(url:url),duration=try await asset.load(.duration).seconds
    guard duration.isFinite && duration>0 && duration<=3600 else { throw FrameError("媒体时长无效，或超过 1 小时。") }
    if kind=="mp3" {
        guard let track=try await asset.loadTracks(withMediaType:.audio).first else { throw FrameError("没有找到可用的音轨。") }
        let rate=try await track.load(.estimatedDataRate)
        let file=try AVAudioFile(forReading:url),format=file.fileFormat
        return AnimationInfo(width:0,height:0,fps:0,frames:0,seconds:duration,bitrate:Int(rate),sampleRate:Int(format.sampleRate),channels:Int(format.channelCount))
    }
    guard let track=try await asset.loadTracks(withMediaType:.video).first else { throw FrameError("没有找到可用的视频画面。") }
    let size=try await track.load(.naturalSize),transform=try await track.load(.preferredTransform),fps=Double(try await track.load(.nominalFrameRate)),rect=CGRect(origin:.zero,size:size).applying(transform)
    let width=Int(abs(rect.width).rounded()),height=Int(abs(rect.height).rounded())
    guard width>0 && height>0 && width<=8192 && height<=8192 else { throw FrameError("视频尺寸无效或超过 8192 像素。") }
    let frameRate=fps>0 ? fps : 30
    return AnimationInfo(width:width,height:height,fps:Int(frameRate.rounded()),frames:Int((duration*frameRate).rounded()),seconds:duration,nominalFPS:frameRate)
}

@MainActor extension App {
    func updateSettings(_ body:[String:Any]) {
        guard !busy else { return }
        applySettings(body);UserDefaults.standard.set(settings.json,forKey:"toolSettings.v32");snapshot()
    }
    func applySettings(_ body:[String:Any]) {
        if let value=body["pagQuality"] as? Int,(0...100).contains(value) {settings.pagQuality=value}
        if let value=body["gifQuality"] as? Int,(0...100).contains(value) {settings.gifQuality=value}
        if let value=body["audioQuality"] as? Int,(0...100).contains(value) {settings.audioQuality=value}
        if let value=body["quality"] as? String,["balanced","small"].contains(value) { settings.quality=value }
        if let value=body["gifFPS"] as? Int,[5,10,12,15,20,24,25,30].contains(value) { settings.gifFPS=value }
        if let value=body["gifSize"] as? Int,[0,240,320,480,720,1080].contains(value) { settings.gifSize=value }
        if let value=body["background"] as? String,["white","black","transparent"].contains(value) { settings.background=value }
        if let value=body["pngFPS"] as? Int,[0,1,5,10,15,24,30,60].contains(value) { settings.pngFPS=value }
        if let value=body["pngSize"] as? Int,[0,480,720,1080,1920].contains(value) { settings.pngSize=value }
    }
    func switchTool(_ name:String) {
        guard toolExtensions[name] != nil else { return };activeTool=name
        selected=entries.first(where:{$0.tool==name})?.id;snapshot()
        if let id=selected { select(id) } else { send(["type":"clearPreview"]) }
    }
    func previewMedia(id:String,result:Bool) {
        guard let entry=entries.first(where:{$0.id==id}) else { return }
        let url=result ? entry.output : entry.url;guard let url else { return }
        mediaPlayer?.pause()
        let player=AVPlayer(url:url),view=AVPlayerView();view.player=player;view.controlsStyle = .floating
        let panel=NSWindow(contentRect:NSRect(x:0,y:0,width:entry.tool=="mp3" ? 520:800,height:entry.tool=="mp3" ? 160:500),styleMask:[.titled,.closable,.resizable,.miniaturizable],backing:.buffered,defer:false)
        panel.delegate=self;panel.title=(result ? "处理后 · ":"原文件 · ")+entry.url.lastPathComponent;panel.contentView=view;panel.center();panel.isReleasedWhenClosed=false;panel.makeKeyAndOrderFront(nil)
        if let old=mediaWindow { old.close() };mediaWindow=panel;mediaPlayer=player;player.play()
    }
    func runFFmpeg(_ arguments:[String],entry:Entry,stage:String,range:ClosedRange<Int> = 5...97) async throws {
        let process=Process(),pipe=Pipe(),log=EncoderLog()
        process.executableURL=root.appendingPathComponent("bin/ffmpeg");process.arguments=["-hide_banner","-nostdin","-y","-loglevel","error","-progress","pipe:1","-nostats"]+arguments;process.standardOutput=pipe;process.standardError=pipe
        let duration=entry.info?.duration ?? 1;entry.stage=stage;snapshot()
        pipe.fileHandleForReading.readabilityHandler={ [weak self,weak entry] handle in
            let data=handle.availableData;guard !data.isEmpty else { handle.readabilityHandler=nil;return }
            let text=String(decoding:data,as:UTF8.self);log.append(text)
            let regex=try? NSRegularExpression(pattern:"out_time_us=(\\d+)")
            if let match=regex?.matches(in:text,range:NSRange(text.startIndex...,in:text)).last,let r=Range(match.range(at:1),in:text),let micros=Double(text[r]) {
                Task { @MainActor in guard let self,let entry,entry.status=="running" else { return };let fraction=min(1,max(0,micros/1_000_000/duration));entry.progress=range.lowerBound+Int(Double(range.upperBound-range.lowerBound)*fraction);self.snapshot() }
            }
        }
        encoder=process;try process.run();let started=Date()
        while process.isRunning {
            if stopRequested { process.terminate() }
            if Date().timeIntervalSince(started)>1200 { process.terminate();throw FrameError("处理超过 20 分钟，请减少时长、尺寸或输出帧率。") }
            try await Task.sleep(nanoseconds:80_000_000)
        }
        pipe.fileHandleForReading.readabilityHandler=nil
        guard !stopRequested else { throw CancellationError() }
        guard process.terminationStatus==0 else { throw FrameError("媒体处理失败，请确认编码受支持、输出目录可写且磁盘空间足够。\n"+String(log.text.suffix(500))) }
    }
    func outputTarget(stem:String,ext:String) throws -> URL {
        do { try FileManager.default.createDirectory(at:outputDir,withIntermediateDirectories:true) } catch { throw FrameError("输出文件夹不可写，请更改保存位置。") }
        var suffix=0,target=outputDir.appendingPathComponent(stem+(ext.isEmpty ? "":"."+ext))
        while FileManager.default.fileExists(atPath:target.path) { suffix += 1;target=outputDir.appendingPathComponent(stem+" (\(suffix))"+(ext.isEmpty ? "":"."+ext)) }
        return target
    }
    func publish(_ source:URL,entry:Entry,stem:String,ext:String,directory:Bool=false) throws {
        let target=try outputTarget(stem:stem,ext:ext)
        do { try FileManager.default.copyItem(at:source,to:target) } catch { try? FileManager.default.removeItem(at:target);throw FrameError("保存失败，请检查输出文件夹权限和可用磁盘空间。") }
        entry.output=target
        if directory {
            let files=try FileManager.default.contentsOfDirectory(at:target,includingPropertiesForKeys:[.fileSizeKey]);entry.resultFrames=files.filter{$0.pathExtension.lowercased()=="png"}.count
            entry.outputBytes=files.reduce(0){$0+((try? $1.resourceValues(forKeys:[.fileSizeKey]).fileSize) ?? 0)}
        } else { entry.outputBytes=(try? target.resourceValues(forKeys:[.fileSizeKey]).fileSize) ?? 0 }
    }
    func convert(_ entry:Entry) async throws {
        if entry.tool=="svga-pag" { try await convertSVGAToPAG(entry);return }
        guard let info=entry.info else { throw FrameError("缺少媒体参数。") }
        let temp=FileManager.default.temporaryDirectory.appendingPathComponent("frame-"+UUID().uuidString,isDirectory:true)
        try FileManager.default.createDirectory(at:temp,withIntermediateDirectories:true);tempDir=temp
        defer { engine?.view.removeFromSuperview();engine=nil;encoder=nil;tempDir=nil;try? FileManager.default.removeItem(at:temp) }
        let stem=entry.url.deletingPathExtension().lastPathComponent
        if entry.tool=="mp3" {
            let target=temp.appendingPathComponent("compressed.mp3")
            let sourceRate=info.bitrate>0 ? info.bitrate : Int(Double(entry.bytes)*8/max(0.1,info.duration))
            var codec:[String]
            let audioQuality=settings.audioQuality
            if audioQuality==100 {codec=["-c:a","copy"];entry.resultNote="高 · 100%：直接复制原音频流，保留原音质；仅清理元数据，体积可能基本不变。"}
            else if audioQuality>=50 && sourceRate<=132000 { codec=["-c:a","copy"];entry.resultNote="源码率已较低，直接复制音频流，避免重复压缩。" }
            else if audioQuality>=50 {
                let initial=sourceRate>=224000 ? 4:5,q=max(0,initial-Int((Double(audioQuality-50)/49*Double(initial)).rounded()))
                codec=["-c:a","libmp3lame","-q:a",String(q)];entry.resultNote="质量档位 \(audioQuality)%：VBR 音频，保留原声道与采样率。"
            } else {
                let rates=[32,40,48,56,64,80,96,112,128,160,192,224,256,320],low=max(32,min(96,Int(Double(sourceRate)*0.7/1000))),upper=max(low,min(160,sourceRate/1000)),target=low+Int(Double(upper-low)*Double(audioQuality)/49),rate=rates.last(where:{$0<=target}) ?? 32
                codec=["-c:a","libmp3lame","-b:a","\(rate)k"];entry.resultNote="质量档位 \(audioQuality)%：\(rate) kbps，体积优先，复杂音乐可能有可闻损失。"
            }
            try await runFFmpeg(["-i",entry.url.path,"-map","0:a:0","-vn","-map_metadata","-1"]+codec+["-id3v2_version","3","-write_xing","1",target.path],entry:entry,stage:"压缩 MP3")
            let size=(try target.resourceValues(forKeys:[.fileSizeKey]).fileSize) ?? 0
            if size>=entry.bytes { try publish(entry.url,entry:entry,stem:stem+"-优化",ext:"mp3");entry.resultNote="当前设置没有得到更小的文件，已保留原音频，避免额外音质损失。" }
            else { try publish(target,entry:entry,stem:stem+"-优化",ext:"mp3") }
            return
        }
        if entry.tool=="mp4-png" {
            let frames=temp.appendingPathComponent("PNG",isDirectory:true);try FileManager.default.createDirectory(at:frames,withIntermediateDirectories:true)
            let fps=settings.pngFPS>0 ? Double(settings.pngFPS) : info.frameRate
            let factor=settings.pngSize>0 ? min(1,Double(settings.pngSize)/Double(max(info.width,info.height))) : 1
            let count=Int(ceil(info.duration*fps))
            guard count<=30000 && Double(info.width)*Double(info.height)*factor*factor*Double(count)<=10_000_000_000 else { throw FrameError("PNG 序列预计过大，请降低导出帧率或长边尺寸后重试。") }
            var filters:[String]=[]
            if settings.pngFPS>0 { filters.append("fps=\(settings.pngFPS)") }
            if factor<1 { filters.append("scale=\(max(1,Int(Double(info.width)*factor))):\(max(1,Int(Double(info.height)*factor))):flags=lanczos") }
            var args=["-i",entry.url.path,"-map","0:v:0","-an"]
            if !filters.isEmpty { args += ["-vf",filters.joined(separator:",")] }
            args += ["-fps_mode","passthrough","-start_number","0","-c:v","png",frames.appendingPathComponent("frame_%06d.png").path]
            try await runFFmpeg(args,entry:entry,stage:"导出 PNG 序列")
            guard !(try FileManager.default.contentsOfDirectory(atPath:frames.path)).isEmpty else { throw FrameError("没有提取到视频帧。") }
            entry.resultNote=settings.pngFPS==0 ? "逐帧导出原视频；PNG 不包含声音。":"已按 \(settings.pngFPS) fps 导出；PNG 不包含声音。"
            try publish(frames,entry:entry,stem:stem+"-PNG",ext:"",directory:true);return
        }
        // GIF rendering samples the source timeline at a bounded output frame rate.
        let frames=temp.appendingPathComponent("frames",isDirectory:true);try FileManager.default.createDirectory(at:frames,withIntermediateDirectories:true)
        let renderer=RenderEngine(root:root,host:web);engine=renderer;try await renderer.load(root:root)
        let data=try Data(contentsOf:entry.url);_ = try await renderer.prepare(data,pag:entry.tool=="pag-gif",root:root)
        let fps=min(Double(settings.gifFPS),info.frameRate),count=max(1,Int(ceil(info.duration*fps)))
        guard count<=3000 && Double(info.width)*Double(info.height)*Double(count)<=1_500_000_000 else { throw FrameError("GIF 渲染量较大，请降低输出帧率或缩短源动画。") }
        for index in 0..<count {
            if stopRequested { throw CancellationError() }
            let seconds=Double(index)/fps,sourceFrame=min(info.frames-1,Int((seconds*info.frameRate).rounded(.down)))
            let png=try await renderer.frame(sourceFrame,progress:min(0.999999,seconds/info.duration))
            if smokeRun && entry.tool=="pag-gif" && index==20 { print("PAG DIAG:",try await renderer.evaluate("return JSON.stringify(window.frameDiagnostics)",arguments:[:]) );fflush(stdout) }
            try png.write(to:frames.appendingPathComponent(String(format:"%06d.png",index)))
            entry.progress=5+Int(Double(index+1)/Double(count)*65);entry.stage="渲染 GIF · \(index+1)/\(count) 帧";if index%2==0 || index+1==count { snapshot() }
        }
        let factor=settings.gifSize>0 ? min(1,Double(settings.gifSize)/Double(max(info.width,info.height))) : 1
        let width=max(1,Int(Double(info.width)*factor)),height=max(1,Int(Double(info.height)*factor))
        let scale="scale=\(width):\(height):flags=lanczos,format=rgba"
        let graph:String,colors=max(64,min(256,64+settings.gifQuality*192/100)),local=settings.gifQuality>=75
        let palette="max_colors=\(colors):stats_mode=\(local ? "single":"full")",usage="dither=\(settings.gifQuality<25 ? "bayer:bayer_scale=3":"sierra2_4a")"+(local ? ":new=1":"")
        if settings.background=="transparent" { graph="[0:v]\(scale),split[a][b];[a]palettegen=reserve_transparent=1:\(palette)[p];[b][p]paletteuse=\(usage):alpha_threshold=128[out]" }
        else { graph="[0:v]\(scale)[fg];color=c=\(settings.background):s=\(width)x\(height):r=\(fps)[bg];[bg][fg]overlay=shortest=1:format=auto,split[a][b];[a]palettegen=reserve_transparent=0:\(palette)[p];[b][p]paletteuse=\(usage)[out]" }
        let gif=temp.appendingPathComponent("animation.gif")
        try await runFFmpeg(["-framerate",String(fps),"-start_number","0","-i",frames.appendingPathComponent("%06d.png").path,"-filter_complex",graph,"-map","[out]","-loop","0","-t",String(info.duration),gif.path],entry:entry,stage:"优化 GIF 调色板",range:71...98)
        let header=try Data(contentsOf:gif).prefix(6);guard String(data:header,encoding:.ascii)?.hasPrefix("GIF8")==true else { throw FrameError("没有生成有效的 GIF。") }
        entry.resultFrames=count;entry.resultNote="\(width)×\(height) · \(String(format:"%.0f",fps)) fps · \(colors) 色 · 质量 \(settings.gifQuality)% · \(local ? "逐帧调色板":"全局调色板")；GIF 无音频。"+(settings.background=="transparent" ? "半透明会转为透明或不透明。":"")
        try publish(gif,entry:entry,stem:stem,ext:"gif")
    }
}

let application=NSApplication.shared
application.setActivationPolicy(CommandLine.arguments.contains("--smoke-test") ? .accessory : .regular)
let delegate=MainActor.assumeIsolated { App() };application.delegate=delegate
application.run()
