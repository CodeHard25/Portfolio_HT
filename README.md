# Portfolio Website

This repository contains my personal portfolio website built with React, TypeScript, GSAP, and Three.js.

![Portfolio Preview](https://github.com/user-attachments/assets/3c4557e7-6392-4928-b8a9-7b2476ef4edd)

## Tech Stack

- React
- TypeScript
- Vite
- GSAP
- Three.js / React Three Fiber
- HTML / CSS

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
npm ci
npm run dev
```

The dev server runs on Vite with host enabled.

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Type-check and create production build in `dist/`
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint checks

## CI/CD and GitHub Pages Deployment

This project is configured with GitHub Actions for automated build and deployment to GitHub Pages.

- Workflow file: `.github/workflows/pages.yml`
- Trigger:
  - Push to `main` or `master` -> build + deploy
  - Pull requests -> build validation only
- Build output deployed from: `dist/`

### GitHub Setup Steps

1. Push this project to your GitHub repository.
2. Go to `Settings -> Pages`.
3. Under Source, select `GitHub Actions`.
4. Push to `main` (or `master`) to trigger deployment.

Vite base path is configured automatically for GitHub Pages in `vite.config.ts`.

## GSAP Note

This project currently uses `gsap-trial`. For production/commercial deployment, use the appropriate GSAP license and official installation flow:

https://gsap.com/docs/v3/Installation/

## License

This project is open source and available under the [MIT License](LICENSE).
