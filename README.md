# venkat-portfolio

Premium personal portfolio for **Venkatraman Rajaram** — QA Manager, Test Automation Architect, and AI-Driven Quality Leader.

Built as a single-page static site with hand-crafted HTML, CSS, and vanilla JavaScript. No build step, no framework — deploys instantly to GitHub Pages, Netlify, or Vercel.

## Stack

- HTML5
- CSS3 (custom design system, glassmorphism, gradient mesh)
- Vanilla JavaScript (IntersectionObserver, requestAnimationFrame counters, 3D tilt)
- Google Fonts: Inter, Space Grotesk, JetBrains Mono

## Local preview

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

### GitHub Pages
1. Push to GitHub (already done — `main` branch).
2. In the repo: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / root → Save.**
3. Site will be live at `https://vramanr.github.io/venkat-portfolio/`.

### Netlify
- Drag-and-drop the project folder at [app.netlify.com](https://app.netlify.com), or connect the GitHub repo. No build command needed; publish directory: `/`.

### Vercel
- Import the repo at [vercel.com/new](https://vercel.com/new). Framework: **Other**. No build command. Output directory: `/`.

## Structure

```
venkat-portfolio/
├── index.html
├── assets/
│   ├── css/styles.css
│   └── js/script.js
└── README.md
```

## Customization

- **Copy & content:** edit `index.html`.
- **Colors, gradients, spacing:** the design tokens live at the top of `assets/css/styles.css` (`:root` block).
- **Animations:** counters, reveals, and tilt are all in `assets/js/script.js`.
