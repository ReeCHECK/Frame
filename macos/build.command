#!/bin/zsh
set -euo pipefail
SOURCE_ROOT="${0:A:h}"
BUILD_ROOT="$SOURCE_ROOT/build"
APP_SOURCE="${FRAME_BASE_APP:?Set FRAME_BASE_APP to the extracted Frame.app from the macOS 3.2 release}"
[[ -d "$APP_SOURCE/Contents/Resources" ]] || { print -u2 "Invalid FRAME_BASE_APP"; exit 1; }
APP_TARGET="$BUILD_ROOT/Frame.app"
mkdir -p "$BUILD_ROOT/ModuleCache" "$APP_TARGET/Contents/MacOS"
cp "$SOURCE_ROOT/Info.plist" "$APP_TARGET/Contents/Info.plist"
cp -R "$APP_SOURCE/Contents/Resources" "$APP_TARGET/Contents/"
python3 - "$SOURCE_ROOT" "$APP_TARGET" <<'PY'
from pathlib import Path
import sys
src=Path(sys.argv[1]);app=Path(sys.argv[2]);ui=src/'ui'
html=(ui/'index.html').read_text().replace('__CSS__',(ui/'style.css').read_text()).replace('__JS__',(ui/'app.js').read_text()).replace('__PLAYER__',(app/'Contents/Resources/vendor/svga.min.js').read_text()).replace('__PAG__',(app/'Contents/Resources/vendor/libpag.js').read_text())
(app/'Contents/Resources/web/index.html').write_text(html)
(app/'Contents/Resources/web/renderer.html').write_text((ui/'renderer.html').read_text())
PY
SWIFT_EXEC="$(xcrun --find swiftc)"
SWIFT_INCLUDES="${SWIFT_EXEC:h:h}/include/swift"
OVERLAY_FLAGS=()
if [[ -f "$SWIFT_INCLUDES/module.modulemap" && -f "$SWIFT_INCLUDES/bridging.modulemap" ]]; then
  python3 - "$BUILD_ROOT" "$SWIFT_INCLUDES" <<'PY'
from pathlib import Path
import json,sys
root=Path(sys.argv[1]);includes=Path(sys.argv[2]);empty=root/'empty.modulemap';empty.write_text('// Build-only overlay for duplicate SwiftBridging declarations.\n')
(root/'vfs.json').write_text(json.dumps({'version':0,'roots':[{'type':'file','name':str(includes/'bridging.modulemap'),'external-contents':str(empty)}]}))
PY
  OVERLAY_FLAGS=(-vfsoverlay "$BUILD_ROOT/vfs.json" -Xcc -ivfsoverlay -Xcc "$BUILD_ROOT/vfs.json")
fi
for BRIDGE_ARCH in arm64 x86_64; do
  clang -arch "$BRIDGE_ARCH" -O2 -mmacosx-version-min=13.0 "$SOURCE_ROOT/PAGQualityBridge.c" -o "$BUILD_ROOT/PAGQualityBridge-$BRIDGE_ARCH"
done
lipo -create "$BUILD_ROOT/PAGQualityBridge-arm64" "$BUILD_ROOT/PAGQualityBridge-x86_64" -output "$APP_TARGET/Contents/Resources/bin/H264EncoderTools/H264EncoderTools"
codesign --force --sign - "$APP_TARGET/Contents/Resources/bin/H264EncoderTools/H264EncoderTools"
for ARCH in arm64 x86_64; do
  print "构建 $ARCH…"
  "$SWIFT_EXEC" -swift-version 5 -O -module-cache-path "$BUILD_ROOT/ModuleCache" "${OVERLAY_FLAGS[@]}" -sdk "$(xcrun --show-sdk-path)" -target "$ARCH-apple-macosx13.0" "$SOURCE_ROOT/Frame.swift" -o "$BUILD_ROOT/Frame-$ARCH"
done
lipo -create "$BUILD_ROOT/Frame-arm64" "$BUILD_ROOT/Frame-x86_64" -output "$APP_TARGET/Contents/MacOS/Frame"
codesign --force --sign - "$APP_TARGET"
codesign --verify --deep --strict "$APP_TARGET"
print "\n构建完成：$APP_TARGET"
