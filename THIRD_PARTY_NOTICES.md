# Third-party notices

The MIT license at the repository root applies to Frame-owned source only. Bundled dependencies retain their copyright and licenses. Distribution of executable releases requires their notices and applicable source obligations as well.

## Web players (source bundled under windows/app/vendor and platform UI)

- SVGAPlayer-Web 2.3.1: https://github.com/svga/SVGAPlayer-Web — Apache-2.0. License: windows/app/licenses/SVGAPlayer-Web-APACHE-2.0.txt.
- libpag Web 4.5.85: https://github.com/Tencent/libpag — Apache-2.0 and included third-party licenses. Full notices: windows/app/licenses/libpag-web-4.5.85-LICENSE.txt. The local compatibility variant replaces import.meta.url with document.baseURI and permits controlled offline frame rendering. Original notices are retained.
- The portable PAG writer follows the tag layout documented in Tencent/libpag codec sources (VideoSequence, VideoCompositionTag, CompositionAttributes, TagHeader). See windows/app/lib/pag-video.cjs.

## Windows runtime (downloaded at build time, not committed)

- Electron 45.1.0: https://github.com/electron/electron/releases/tag/v45.1.0 — MIT and Chromium/Node dependency licenses. Preserve LICENSE and LICENSES.chromium.html from the runtime.
- FFmpeg 9.0 BtbN shared GPL build, 20261029, with x264 and LAME: https://github.com/BtbN/FFmpeg-Builds. FFmpeg is invoked as a separate process; its GPL and dependency licenses apply to the distributed binary. Build recipes and dependency source acquisition: https://github.com/BtbN/FFmpeg-Builds. Upstream source: https://git.ffmpeg.org/ffmpeg.git (n9.0), https://code.videolan.org/videolan/x264, https://sourceforge.net/projects/lame/files/lame/.
- NSIS: https://nsis.sourceforge.io/ — license copy windows/NSIS-COPYING.txt. Development-only @electron/asar, resedit, png-to-ico and 7zip-bin keep their package licenses.
- Runtime URLs and SHA-256 are recorded in windows/runtime-manifest.json. Upstream latest assets may change; do not bypass the hash check.

## macOS runtime (obtained from the release resource base)

- PAGConvertor / H264EncoderTools: https://pag.io/docs/pag-convert-download.html. Official PAGConvertor-mac.zip SHA-256: 833d365bc56cfc7352d401d77468930a2546932ff6583512e600d7a689650286. Preserve original binary licenses, COPYING, THIRD_PARTY_NOTICES.md and source archives. The original helper is named H264EncoderOriginal; Frame builds its own quality bridge separately. The official converter is a binary dependency, not Frame MIT source.
- FFmpeg 9.0.2 lightweight local build, LGPL-2.1-or-later; LAME 3.100, LGPL. Build scripts: macos/codecs/. License texts: macos/licenses/.
  - https://www.ffmpeg.org/releases/ffmpeg-9.0.2.tar.xz — SHA-256 8c3850283eb25fa026482078a04051e0be17347b09ef81a0849bec15a96e002e
  - https://downloads.sourceforge.net/project/lame/lame/3.100/lame-3.100.tar.gz — SHA-256 ddfe36cab873794038ae2c1210557ad34857a4b6bdc515785d1da9e175b1da1e
  - Extract source under macos/codecs/deps/, create macos/codecs/build/, run build-lame.sh and then build-ffmpeg.sh on macOS. Release packages also include source archives and licenses. FFmpeg is replaceable as an independent subprocess; re-sign the app after replacing it.

The Frame logo asset is included with this project. Third-party names are used for attribution; no endorsement is implied.

## Image compression codecs (Frame 3.4)

@jsquash/webp 1.5.0 and @jsquash/oxipng 2.3.0: https://github.com/jamsinclair/jSquash — Apache-2.0 wrappers with their own codec licenses. License copies: windows/app/licenses/jsquash-*-LICENSE.txt and jsquash-*-codec-LICENSE.md. WebP uses libwebp; PNG uses OxiPNG. Only the single-threaded local WASM builds are bundled, with no service or CDN dependency. Bundle entry: windows/image-codecs-entry.mjs; builder: windows/build-image-codecs.cjs. esbuild is used only during development.
