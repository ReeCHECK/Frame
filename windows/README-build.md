# Frame 3.3 Windows source

This is the source for the Windows x64 application. Users run Frame.exe or the installer; only rebuilding requires Node.js 22.12+.

1. Run `npm ci`.
2. Run `npm run build:windows`.
3. The app is generated in `dist/Frame 3.3 Windows`.

The build downloads the recorded official Electron and FFmpeg archives and verifies SHA-256 before extracting. FFmpeg's `latest` URL can change upstream; a changed digest intentionally stops the build. You can instead retain the original dependency archives in `deps/`, or reuse the supplied portable app as the runtime:

```sh
node build-windows.cjs --runtime "C:\path\to\Frame 3.3 Windows"
```

Use a separate runtime directory; the source portable app is copied, not modified. To generate an installer, install NSIS 3, put makensis on PATH (or set NSIS_EXE), and append `--installer`. The installer manifest removes only packaged files on uninstall; it does not remove user exports or settings.

`render-ui.cjs` builds the local interface from `app/ui/index.template.html`, CSS, JS and the bundled players. `package-win.cjs` writes the Frame icon and version resources and creates app.asar. No platform-specific Node addons are used.

`app/lib/controller.cjs` provides the seven media conversion workflows, validation, cancellation and re-export. `app/lib/pag-video.cjs` encodes a color/alpha video atlas with x264 and writes the official PAG VideoSequence tag layout. The Electron host uses isolated, sandboxed renderers; local file conversion uses spawn without shell interpolation. The app blocks renderer network requests and constrains FFmpeg protocols to local file and pipe input.

FFmpeg is a separately launched GPL component. Its license and upstream source/build links are provided with the app. Electron, SVGAPlayer and libpag retain their own licenses. Frame application source is MIT.

Verification was performed using Electron 45.1.0 and FFmpeg 8.1 on macOS for shared-code integration, plus independent PAG decoding and alpha checks. The shipped Windows runtime is Electron 45.1.0 x64, with FFmpeg 9.0 (BtbN shared build 20261029). The Windows binaries and dependency imports were checked, but a Windows hardware execution and installer run have not been completed.
