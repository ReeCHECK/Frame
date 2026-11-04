const fs=require('node:fs/promises'),path=require('node:path');
(async()=>{const root=path.resolve(__dirname),dist=path.join(root,'dist/Frame 3.4 Windows');const files=[],dirs=[];async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory()){await walk(p);dirs.push(path.relative(dist,p));}else files.push(path.relative(dist,p));}}await walk(dist);const esc=s=>s.replaceAll('$','$$').replaceAll('"','$\\"'),win=s=>esc(s.split(path.sep).join('\\')),estimated=Math.ceil((await Promise.all(files.map(f=>fs.stat(path.join(dist,f))))).reduce((s,x)=>s+x.size,0)/1024);
const source=`Unicode true
!include "MUI2.nsh"
!include "x64.nsh"
Name "Frame 3.4"
OutFile "${esc(process.env.FRAME_INSTALLER_OUT||path.join(root,'Frame-Setup-3.4.0-x64.exe'))}"
InstallDir "$LOCALAPPDATA\\Programs\\Frame"
InstallDirRegKey HKCU "Software\\Frame" "InstallDir"
RequestExecutionLevel user
SetCompressor /SOLID lzma
SetCompressorDictSize 16
VIProductVersion "3.4.0.0"
VIAddVersionKey /LANG=2052 "ProductName" "Frame"
VIAddVersionKey /LANG=2052 "FileDescription" "Frame 3.4 安装程序"
VIAddVersionKey /LANG=2052 "FileVersion" "3.4.0"
VIAddVersionKey /LANG=2052 "ProductVersion" "3.4.0"
VIAddVersionKey /LANG=2052 "LegalCopyright" "Frame contributors"
!define MUI_ICON "${esc(path.join(root,'Frame.ico'))}"
!define MUI_UNICON "${esc(path.join(root,'Frame.ico'))}"
!define MUI_ABORTWARNING
!define MUI_WELCOMEPAGE_TITLE "安装 Frame 3.4"
!define MUI_WELCOMEPAGE_TEXT "本地媒体工具箱：动画格式转换、音频压缩和视频帧导出。$\\r$\\n$\\r$\\n本程序仅安装到当前用户，不需要另装 Node.js 或 FFmpeg。"
!define MUI_FINISHPAGE_RUN "$INSTDIR\\Frame.exe"
!define MUI_FINISHPAGE_RUN_TEXT "打开 Frame"
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "SimpChinese"
Function .onInit
  \${IfNot} \${RunningX64}
    MessageBox MB_ICONSTOP "Frame 需要 64 位 Windows 10 或 Windows 11。"
    Abort
  \${EndIf}
  close_check:
  FindWindow $0 "" "Frame — 本地媒体工具箱"
  StrCmp $0 0 close_done
  MessageBox MB_RETRYCANCEL|MB_ICONINFORMATION "请先关闭正在运行的 Frame，再继续安装。" IDRETRY close_check
  Abort
  close_done:
FunctionEnd
Section "Frame" SecMain
  SetShellVarContext current
  SetOutPath "$INSTDIR"
  File /r "${esc(dist)}/*"
  WriteUninstaller "$INSTDIR\\Uninstall Frame.exe"
  CreateShortCut "$SMPROGRAMS\\Frame.lnk" "$INSTDIR\\Frame.exe" "" "$INSTDIR\\Frame.exe" 0
  CreateShortCut "$DESKTOP\\Frame.lnk" "$INSTDIR\\Frame.exe" "" "$INSTDIR\\Frame.exe" 0
  WriteRegStr HKCU "Software\\Frame" "InstallDir" "$INSTDIR"
  WriteRegStr HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Frame" "DisplayName" "Frame 3.4"
  WriteRegStr HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Frame" "DisplayVersion" "3.4.0"
  WriteRegStr HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Frame" "Publisher" "Frame"
  WriteRegStr HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Frame" "DisplayIcon" "$INSTDIR\\Frame.exe"
  WriteRegStr HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Frame" "UninstallString" '$\\"$INSTDIR\\Uninstall Frame.exe$\\"'
  WriteRegDWORD HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Frame" "NoModify" 1
  WriteRegDWORD HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Frame" "NoRepair" 1
  WriteRegDWORD HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Frame" "EstimatedSize" ${estimated}
SectionEnd
Function un.onInit
  close_check:
  FindWindow $0 "" "Frame — 本地媒体工具箱"
  StrCmp $0 0 close_done
  MessageBox MB_RETRYCANCEL|MB_ICONINFORMATION "请先关闭正在运行的 Frame，再继续卸载。" IDRETRY close_check
  Abort
  close_done:
FunctionEnd
Section "Uninstall"
  SetShellVarContext current
  Delete "$SMPROGRAMS\\Frame.lnk"
  Delete "$DESKTOP\\Frame.lnk"
${files.map(f=>'  Delete "$INSTDIR\\'+win(f)+'"').join('\n')}
  Delete "$INSTDIR\\Uninstall Frame.exe"
${dirs.map(d=>'  RMDir "$INSTDIR\\'+win(d)+'"').join('\n')}
  RMDir "$INSTDIR"
  DeleteRegKey HKCU "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Frame"
  DeleteRegKey HKCU "Software\\Frame"
SectionEnd
`;await fs.writeFile(path.join(root,'Frame-installer.nsi'),'\uFEFF'+source,'utf8');console.log('Installer script ready:',files.length,'files',estimated,'KB');})();
