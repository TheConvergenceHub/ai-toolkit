# AI Toolkit — Free, Private, In-Browser Tools

Five small utilities that solve annoying everyday file problems — remove a background, merge PDFs, convert HEIC photos, resize/compress an image, generate a QR code — with **zero backend**. Every byte of processing happens on your own device, in your own browser tab. Nothing is uploaded, nothing is stored, nothing is seen by anyone else.

Built and maintained by **[The Convergence](https://theconvergencehub.com)**. Try them live, no install required:

| Tool | What it does | Try it |
|---|---|---|
| 🖼️ Remove Background | Cuts the background out of a photo using an open-source AI model | [Live tool](https://theconvergencehub.com/remove-background.html) |
| 📄 Merge PDF | Combines multiple PDFs into one, in the order you choose | [Live tool](https://theconvergencehub.com/merge-pdf.html) |
| 🔄 Convert Image | Converts between HEIC (iPhone), PNG, JPG, and WebP | [Live tool](https://theconvergencehub.com/convert-image.html) |
| 📐 Resize & Compress Image | Shrinks a photo for upload or email | [Live tool](https://theconvergencehub.com/resize-image.html) |
| 🔲 QR Code Generator | Turns a link or text into a downloadable QR code | [Live tool](https://theconvergencehub.com/qr-code-generator.html) |

## Why no backend?

Every tool here runs entirely client-side using well-established open-source libraries loaded from a CDN. That means:

- **Privacy by default** — your files never leave your device.
- **No account, no signup** — nothing to lose, nothing to leak.
- **Free to self-host** — this repo is the same code running on theconvergencehub.com; clone it, open an HTML file, and it works.

## How it's built

| Tool | Library |
|---|---|
| Remove Background | [`@imgly/background-removal`](https://github.com/imgly/background-removal-js) |
| Merge PDF | [`pdf-lib`](https://github.com/Hopding/pdf-lib) |
| Convert Image | [`heic2any`](https://github.com/alexcorvi/heic2any) + Canvas API |
| Resize & Compress | Canvas API |
| QR Code Generator | [`qrcode`](https://github.com/soldair/node-qrcode) |

Plain HTML/CSS/JS, no build step, no framework. Each tool is a single self-contained page under [`/tools`](./tools) that pulls in the shared stylesheet and unlock logic from [`/shared`](./shared).

## Running locally

No build step — just serve the folder so relative paths resolve correctly (opening the file directly via `file://` will work for the core free flow in most browsers, but a local server is more reliable):

```bash
git clone https://github.com/<your-username>/ai-toolkit.git
cd ai-toolkit
python3 -m http.server 8080
# then open http://localhost:8080/tools/remove-background.html
```

## Free core, optional Pro extras

Every tool's core function is free, forever, for everyone — that will never change. A few extras (batch processing, custom sizing/colors, unlimited PDF merges) are gated behind a one-time unlock, tracked locally in your browser (no account, no server-side check). See [`shared/toolkit-access.js`](./shared/toolkit-access.js) for exactly how that works — it's short and fully readable. Buying a Pro unlock supports continued development of these tools and the rest of the site.

## Contributing

Issues and pull requests are welcome — new tools, bug fixes, accessibility improvements, or a translation are all fair game. Keep new tools consistent with the pattern: a single HTML file under `/tools`, zero backend, all processing on-device.

## License

MIT — see [LICENSE](./LICENSE). Use this code however you like.
