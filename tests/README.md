# PNG export integration test

Install Windows build dependencies with `cd windows && npm ci`. Install `playwright-core` separately for the test runner. Supply an Electron executable (45.1.0), FFmpeg, ffprobe, and transparent SVGA/PAG fixtures you have permission to use. No private test media is included in this repository.

```sh
node tests/png-export.electron.cjs --electron /path/to/electron --svga /path/to/animation.svga --pag /path/to/animation.pag --ffmpeg /path/to/ffmpeg --ffprobe /path/to/ffprobe --output /path/to/test-exports --screenshots /path/to/screenshots
```

`FRAME_PLAYWRIGHT_MODULE` can point to a separately installed playwright-core module. The runner checks seven empty states, original pixel size and frame count, transparent and partial-alpha pixels, downsampling and resizing, changed-setting re-export, preservation of previous folders and cancellation. Fixtures must contain visible, partially transparent and fully transparent pixels around 60% of their timeline. The test expects the resized output to fit a 480-pixel long edge and saves a verification report outside the source tree.

The Electron source is shared code; running the test on macOS does not replace Windows hardware verification.

## Image compression

Run `image-compression.electron.cjs` with `--electron` and optionally `--output` / `--screenshot`. It generates its own PNG, rotated JPEG and WebP fixtures and tests pixel-exact PNG optimization, transparent WebP, white JPEG background, EXIF orientation, quality changes, batch resizing, original-file fallback, non-overwrite, cancellation, invalid inputs and animation rejection. It requires `sharp`, `playwright-core`, and Windows build dependencies. `FRAME_SHARP_MODULE` and `FRAME_PLAYWRIGHT_MODULE` may point to separately installed packages.
