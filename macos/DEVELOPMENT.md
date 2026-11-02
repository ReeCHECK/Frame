# Frame 3.3 开发说明

`Frame.swift` 包含 AppKit 宿主、AVFoundation / AVKit 媒体元数据与预览、队列管理、系统 WebKit 动效渲染、PAG 编码与 FFmpeg 子进程调用。`ui/` 为工作台 HTML、样式、交互和渲染页面。

正常用户只需使用 Frame.app，不需要编译工具。开发重建需要 Apple Command Line Tools 与 Python 3；设置 FRAME_BASE_APP 后运行 `./build.command`生成本目录 `build/Frame.app`，不会覆盖交付 App。资源从同级 App 复制，主界面的 CSS、JS 和播放器在构建时内嵌。

## 原生转换检查

```sh
'../Frame.app/Contents/MacOS/Frame' --smoke-test '/path/file.mp3' --quality balanced --output '/path/test-output'
'../Frame.app/Contents/MacOS/Frame' --smoke-test '/path/file.mp3' --quality small --output '/path/test-output'
'../Frame.app/Contents/MacOS/Frame' --smoke-test '/path/file.mp4' --png-fps 5 --png-size 720 --output '/path/test-output'
'../Frame.app/Contents/MacOS/Frame' --smoke-test '/path/file.pag' --tool pag-gif --gif-fps 10 --gif-size 480 --gif-background white --output '/path/test-output'
'../Frame.app/Contents/MacOS/Frame' --smoke-test '/path/file.svga' --tool svga-gif --gif-background transparent --output '/path/test-output'
'../Frame.app/Contents/MacOS/Frame' --smoke-test '/path/file.svga' --tool svga-pag --output '/path/test-output'
```

测试运行真实的原生 App 循环和编码流程，打印阶段、输出路径与 `SMOKE PASSED` 后退出；失败为非零退出码。普通界面启动不需要任何参数。

## 渲染注意点

PAG SDK 的视频读取依赖 WebKit 页面与窗口连接。渲染 WebView 挂接在宿主页面的底层，任务结束后移除；离屏页用受控计时器和显式视频暂停定位，避免后台可见性或播放容差导致空白 / 重复帧。不要把它改成完全脱离窗口的 WebView，也不要用“文件存在”替代实际解码画面验证。

PAG JavaScript 的本地兼容修改见包内第三方说明，实际文件是 `ui/libpag-compatible.js`；对应 WebAssembly 位于 App 的 Resources/vendor。

## 编码器源码

`codecs/` 目录提供双架构构建脚本；完整上游源码的来源和校验值见根目录 THIRD_PARTY_NOTICES.md。源码解压到 codecs/deps/，创建 codecs/build/，先构建 LAME 再构建 FFmpeg。替换 App 内编码器后，需要重新签名整个 App。

依赖没有运行时网络请求，也不依赖 Homebrew 路径。编译配置字符串可能保留构建路径，但动态链接检查只包含 macOS 系统库。

本机 Command Line Tools 存在重复 SwiftBridging 模块声明；重建脚本使用构建目录的 VFS overlay 隔离冲突，不编辑系统工具链。

## 图标

当前采用 C「折叠流」。`ui/app-icon.png` 为 1024 像素透明 PNG；`ui/app-icon-legacy.svg` 为旧版设计存档。应用的 `Resources/Frame.icns` 包含系统所需图标尺寸。界面采用内嵌 PNG，不需网络加载。

## 3.2 PAG 视频质量

PAG 所有档位均调用同一 PAGConvertor / H.264 视频编码链路，不再使用 FramePAGEncoder / WebP bitmap sequence 写出路径。对应自建图像编码器、libwebp 分发文件已经删除；读取旧图像序列 PAG 的能力由既有 libpag 保留。

PAGQualityBridge.c 编译为 Universal `bin/H264EncoderTools/H264EncoderTools`。它只修改转换器在当前临时会话生成的 EncoderParam.txt 内的 Quality 数字，然后 exec 同目录官方 H264EncoderOriginal；其余参数不变，原编码器二进制保持原始签名。重建脚本同时重建桥接程序并签名。

UI 的 pagQuality 0..100 仅为“小体积—均衡”内部插值，映射编码质量 80..98；页面不显示百分比，也不声称保真百分比。默认 0，即原有 80 参数。编码器接收本进程环境变量 FRAME_PAG_QUALITY，桥接程序限制在 80..98，未设置时采用 80。

为了避免运行时向签名 App 或只读安装目录写入编码会话，每次任务把转换器与两个编码器文件复制到该任务的临时 encoder-bin，再执行并统一清理。

完成结果记录设置指纹 pag-video:<value>，与 3.1 的 bitmap 设置含义区分。调整后可重新导出，旧文件不覆盖。设置独立保存到 toolSettings.v32，避免旧版 100% 无损设置被误用。

冒烟测试示例：

```sh
'../Frame.app/Contents/MacOS/Frame' --smoke-test '/path/file.svga' --output-quality 0 --smoke-reexport-quality 100 --output '/path/test-output'
```

这里 100 对应新的“均衡”端点，不是无损。测试在同一个 App 会话里完成两个档位的导出，并测试完成状态可重新处理和同名自动编号。

本机重建使用显式 SDK、macosx 目标 triple 和 VFS overlay 隔离 SwiftBridging 重复模块声明，不修改系统工具链。

## 3.3 PNG 序列导出

新增 svga-png / pag-png 工具；默认逐帧原尺寸导出，保留 alpha。设置 pngFPS / pngSize 后可重新导出。动画提取帧率不超过源帧率。PAG 离屏导出设置 useScale:false，防止 Retina 屏幕将实际像素尺寸放大。结果按 frame_000000.png 编号，每次导出独立文件夹。

原生集成测试支持 --smoke-reexport-png-fps 和 --smoke-reexport-png-size，在同一会话变更设置并再次导出。
