
#Readme trigger
# Blacksof — Selected Work

A single-page portfolio website showcasing selected work for Blacksof. Built as a static HTML/CSS/JS site bundled with Vite. All third-party assets (images, videos, fonts, libraries) are stored locally under `public/assets/` so the project is fully self-contained and can be pushed to a Git repository or hosted anywhere.

## Project structure

```
artifacts/blacksof/
├── index.html              # Main HTML (all markup, styles, and client-side routing)
├── public/
│   └── assets/
│       ├── fonts/          # Satoshi font CSS + woff2/woff/ttf files
│       ├── img/            # All images (jpg, png, gif)
│       ├── lib/            # Third-party JS libraries (pdf.js)
│       └── video/          # All MP4 videos
├── vite.config.ts          # Vite build configuration
├── package.json
└── README.md
```

## Routes (client-side)

| Path               | Page                  |
| ------------------ | --------------------- |
| `/`                | Selected Work index   |
| `/nippon-india`    | Nippon India Mutual Fund |
| `/gems-mantra`     | GemsMantra            |
| `/astro-arun`      | Astro Arun Pandit     |
| `/posidex`         | Posidex               |
| `/lauritz-knudsen` | Lauritz Knudsen       |
| `/rbi`             | RBI                   |

The browser History API (`pushState` / `popstate`) is used for navigation. In production, all unknown paths are rewritten to `index.html` so deep links work on refresh (configured in `.replit-artifact/artifact.toml`).

## Development

From the monorepo root:

```bash
pnpm install
pnpm --filter @workspace/blacksof run dev
```

The Vite dev server requires `PORT` and `BASE_PATH` env vars (set automatically when running through the Replit workflow).

## Production build

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/blacksof run build
```

Output is written to `artifacts/blacksof/dist/public/`. The folder is fully static — drop it on any web server or CDN. Configure the server to fall back to `index.html` for unknown routes so client-side routing works on refresh.

## Notes on assets

- All asset URLs in `index.html` are relative paths starting with `/assets/...`.
- The Satoshi font CSS (`public/assets/fonts/satoshi.css`) was downloaded from Fontshare and rewritten to reference the local font files in `public/assets/fonts/files/`.
- Total asset size is around 380 MB (mostly MP4 videos). If pushing to GitHub, consider Git LFS for the video files or hosting them on a CDN and updating the paths in `index.html`.
