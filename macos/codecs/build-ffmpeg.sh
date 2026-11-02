#!/bin/bash
set -euo pipefail
MEDIA_BUILD_ROOT="$(cd "$(dirname "$0")" && pwd)"
for arch in arm64 x86_64; do
  mkdir -p "$MEDIA_BUILD_ROOT/deps/ffmpeg-build-$arch"
  cd "$MEDIA_BUILD_ROOT/deps/ffmpeg-build-$arch"
  "$MEDIA_BUILD_ROOT/deps/ffmpeg-9.0.2/configure" --prefix="$MEDIA_BUILD_ROOT/deps/ffmpeg-$arch" --arch="$arch" --target-os=darwin --enable-cross-compile --cc=clang --disable-autodetect --disable-network --disable-everything --disable-doc --disable-debug --disable-shared --enable-static --enable-small --disable-x86asm --disable-avdevice --disable-programs --enable-ffmpeg --enable-zlib --enable-libmp3lame --enable-protocol=file,pipe --enable-demuxer=mov,mp3,image2,png_pipe --enable-muxer=mp3,image2,gif,null --enable-decoder=h264,hevc,mpeg4,mp3,mp3float,aac,png,gif --enable-encoder=libmp3lame,png,gif --enable-parser=h264,hevc,mpegaudio,aac,mpeg4video,png --enable-filter=buffer,buffersink,abuffer,abuffersink,scale,fps,format,split,palettegen,paletteuse,overlay,color,aresample,aformat,null,anull,transpose,hflip,vflip --extra-cflags="-arch $arch -mmacosx-version-min=13.0 -I$MEDIA_BUILD_ROOT/deps/lame-$arch/include" --extra-ldflags="-arch $arch -mmacosx-version-min=13.0 -L$MEDIA_BUILD_ROOT/deps/lame-$arch/lib" > configure.log 2>&1
  make -j8 > build.log 2>&1
  cp ffmpeg "$MEDIA_BUILD_ROOT/build/ffmpeg-$arch"
  echo "FFmpeg built: $arch"
done
lipo -create "$MEDIA_BUILD_ROOT/build/ffmpeg-arm64" "$MEDIA_BUILD_ROOT/build/ffmpeg-x86_64" -output "$MEDIA_BUILD_ROOT/build/ffmpeg"
