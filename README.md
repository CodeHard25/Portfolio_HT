# Hardik Tyagi | AI Engineer Portfolio

A portfolio that is intentionally built like a product, not a static profile page.

It presents my work as a **Senior AI Engineer** focused on production-grade systems across healthcare, fintech, legaltech, and ecommerce.

- Live portfolio: https://codehard25.github.io/Portfolio_HT
- Role focus: Senior AI Engineer
- Current status: Open to Senior AI Roles

![Portfolio Preview](https://github.com/user-attachments/assets/3c4557e7-6392-4928-b8a9-7b2476ef4edd)

## What This Portfolio Represents

This project reflects how I actually build in real teams:

- AI-first architecture, not demo-only integrations
- full pipeline ownership: ingestion -> orchestration -> inference -> deployment
- production reliability with CI/CD, caching, async APIs, and cloud deployment
- frontend experience that communicates technical depth clearly to recruiters and engineering leaders

## Snapshot

- 6 AI products in production
- 3+ years building AI systems
- 4 industry domains
- 20+ skills used in shipped systems

## Core Stack

- Frontend: React, TypeScript, Vite, GSAP
- 3D / Interactive: Three.js, React Three Fiber
- AI & Backend (portfolio narrative + showcased work): FastAPI, Claude API, OpenAI, LangChain, PyTorch, Redis
- Deployment: GitHub Actions + GitHub Pages

## Featured Case Studies in the Site

- Men's Mastery Framework (GenAI fashion advisory)
- GenAI Compliance Module (legal/compliance intelligence)
- CandleStick-AI (ML market analytics platform)
- Healthcare Billing Reconciliation (high-volume operations automation)

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Run Locally

```bash
npm ci
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## CI/CD (GitHub-Based Only)

Deployment is fully driven from GitHub Actions:

- Frontend (static): `.github/workflows/pages.yml` -> GitHub Pages
- Chat API (serverless): `.github/workflows/vercel-api.yml` -> Vercel Edge Function

### Why this split

GitHub Pages is static hosting only. The AI chatbot needs a server runtime to keep the OpenAI key private, so `/api/chat` is deployed as a Vercel Edge Function from GitHub Actions.

### Required GitHub Secrets

- `VITE_CHAT_API_BASE_URL` -> your deployed API origin (example: `https://portfolio-ht.vercel.app`)
- `OPENAI_API_KEY` -> server-only OpenAI key
- `VERCEL_TOKEN` -> Vercel token used by GitHub Actions
- `VERCEL_ORG_ID` -> Vercel org id
- `VERCEL_PROJECT_ID` -> Vercel project id

### Zero Key Leakage Rules

- `OPENAI_API_KEY` is read only in `api/chat.ts` at runtime (`process.env`).
- No OpenAI key is exposed through `VITE_*` variables.
- Frontend only receives `VITE_CHAT_API_BASE_URL` (public-safe endpoint URL).
- `.env.example` documents allowed public env vars only.

### Enable Deployment

1. Push this repository to GitHub.
2. In `Settings -> Secrets and variables -> Actions`, add the secrets listed above.
3. In `Settings -> Pages`, set source to `GitHub Actions`.
4. Push to `main` (or `master`) to trigger both deployments.

## Scripts

- `npm run dev` - local development server
- `npm run build` - TypeScript build + Vite production build
- `npm run preview` - preview built app locally
- `npm run lint` - lint project

## GSAP Licensing Note

This repository currently uses `gsap-trial`.
For commercial/production licensing requirements, use the official GSAP installation flow:

https://gsap.com/docs/v3/Installation/

## License

This project is open source under the [MIT License](LICENSE).
