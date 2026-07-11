# Rafaa Selmi — Developer Portfolio

A premium, dark-themed developer portfolio for a React/JavaScript/Flutter
profile. Built with React + Vite + TypeScript + Tailwind CSS + Framer Motion,
with zero backend — every piece of content lives in `src/data/*.json`.

**Live signature features**

- Interactive fake terminal in the hero (`whoami`, `neofetch`, `ls projects`, `cat skills.txt`, `help`, `clear`)
- Command palette — press `Ctrl/Cmd + K` anywhere
- Ubuntu-boot-style loading screen on first load
- Animated, filterable project grid with dedicated project detail pages
- Linux Lab: terminal-style cards covering shell scripting, permissions, systemd, SSH, cron, Docker
- Interactive, hoverable network topology (clients → switch → firewall → router → servers)
- Flutter phone mockups for mobile projects
- Live GitHub stats + contribution graph, fetched client-side from the public GitHub API
- Cursor spotlight, gradient blobs, subtle code-rain canvas, floating tech icons, a penguin that walks as you scroll
- Full keyboard accessibility and `prefers-reduced-motion` support throughout

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Editing content

Nothing here needs a CMS. Edit the JSON files in `src/data/`:

| File | Powers |
| --- | --- |
| `profile.json` | Name, roles, tagline, contact links, resume URL |
| `timeline.json` | The About section timeline |
| `skills.json` | Tech Stack grid of skill buttons/chips |
| `projects.json` | Featured Projects grid **and** the project detail pages |
| `linuxLab.json` | Linux Lab terminal cards |
| `network.json` | Network topology nodes/links/legend |
| `mobileApps.json` | Mobile Apps phone mockups |

Replace `public/resume-rafaa-selmi.pdf` with your real CV — the filename is
referenced from `profile.json` (`resumeUrl`).

## Project structure

```
src/
  animations/   Shared Framer Motion variants
  components/   Reusable UI: Navbar, Footer, terminal, command palette, cards…
  data/         All content, as JSON
  hooks/        useTypingEffect, useMousePosition, useTheme, useScrollProgress…
  pages/        Route-level views: Home, ProjectDetail, NotFound
  sections/     Landing-page sections assembled by pages/Home.tsx
  types/        Shared TypeScript interfaces for the data above
```

## Deploying to GitHub Pages

This project uses `HashRouter`, so it works on GitHub Pages without any
server-side rewrite rules — refreshing `/#/projects/nocturne-uptime` just works.

1. Open `vite.config.ts` and set `base` to your repository name, e.g.
   `base: '/your-repo-name/'`. If you're deploying to a `<username>.github.io`
   root repository or a custom domain, use `base: '/'` instead.
2. Push to `main`. The included workflow at `.github/workflows/deploy.yml`
   builds the site and deploys it to GitHub Pages automatically via
   `actions/deploy-pages`.
3. In your repository settings, under **Pages**, set the source to
   **GitHub Actions** (one-time setup).

Alternatively, deploy manually with the `gh-pages` package already wired up:

```bash
npm run deploy
```

## Performance & SEO notes

- Route-level code isn't split further than the two routes (Home, Project
  detail) since the whole app is intentionally small; add `React.lazy` around
  `ProjectDetail` if you grow the bundle significantly.
- `index.html` ships basic meta/OG tags — update the description and title
  for your own name and focus areas.
- Images used in project cards/galleries are intentionally abstract
  gradient placeholders rather than stock photos; swap in real screenshots
  under `src/assets/` and reference them from `projects.json` when you have
  them.

## License

MIT — see [LICENSE](./LICENSE).
