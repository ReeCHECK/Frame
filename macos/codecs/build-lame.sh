#!/bin/bash
set -euo pipefail
MEDIA_BUILD_ROOT="$(cd "$(dirname "$0")" && pwd)"
for arch in arm64 x86_64; do
  mkdir -p "$MEDIA_BUILD_ROOT/deps/lame-build-$arch" "$MEDIA_BUILD_ROOT/deps/lame-$arch"
  cd "$MEDIA_BUILD_ROOT/deps/lame-build-$arch"
  host="x86_64-apple-darwin"; [ "$arch" != arm64 ] || host="arm-apple-darwin"
  CC="clang -arch $arch -mmacosx-version-min=13.0" CFLAGS="-O2 -fPIC" "$MEDIA_BUILD_ROOT/deps/lame-3.100/configure" --host="$host" --prefix="$MEDIA_BUILD_ROOT/deps/lame-$arch" --disable-shared --enable-static --disable-frontend --disable-decoder --disable-nasm > configure.log 2>&1
  make -j8 > build.log 2>&1
  make install > install.log 2>&1
  echo "LAME built: $arch"
done
