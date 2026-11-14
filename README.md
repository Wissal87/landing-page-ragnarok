# Ragnarok: The New World — Landing Page (STAGE-RAG-01)

```
ragnarok-landing/
├── index.html
├── style.css
├── script.js
├── download-assets.sh      # macOS / Linux / Git Bash
├── download-assets.ps1     # Windows PowerShell
└── assets/
    ├── images/
    │   ├── logo.webp            (official logo)
    │   ├── hero-bg.webp         (hero poster / background)
    │   ├── key-art.webp         (section 04 visual)
    │   ├── world-bg-1.webp      (section 05 background)
    │   ├── world-bg-5.webp      (section 04 background)
    │   ├── steam-header.jpg
    │   └── screenshots/
    │       ├── ss-01.jpg … ss-11.jpg          (Steam, 1920x1080)
    │       └── ss-01-600.jpg … ss-11-600.jpg  (Steam, 600x338 for mobile)
    └── videos/
        └── trailer.mp4          (official trailer)
```

## 1. Fill the assets folder
Run once from the project folder:

- macOS / Linux: `./download-assets.sh`
- Windows: right-click `download-assets.ps1` → *Run with PowerShell*

All files come from the official website (gnjoy.hk) and the official Steam page.
Use them only within the scope authorised by the client (Gravity Game Vision).

## 2. Where each image is used
| Section | File |
|---|---|
| Hero | `hero-bg.webp`, `videos/trailer.mp4`, `logo.webp` |
| 02 Features (cards) | `screenshots/ss-05`, `ss-06`, `ss-07` — background `ss-01` |
| 03 Gallery | `ss-01` → `ss-04` (tiles), all 11 in the lightbox |
| 04 Legend | `world-bg-5.webp`, `key-art.webp` |
| 05 Final CTA | `world-bg-1.webp` |

To change a visual, replace the file (same name) or edit the path in `index.html`
(gallery tiles: `GALLERY` in `script.js`).

## 3. Before going live
- Compress `trailer.mp4` for web (~5–8 MB, 1080p H.264) for fast loading.
- `og:image` in `index.html` must be an absolute URL — replace it with your domain once hosted.
- Paste the Meta Pixel / GA4 / GTM IDs in the commented block in `<head>`.
- First Login tracking must come from the publisher's SDK / attribution postback.
