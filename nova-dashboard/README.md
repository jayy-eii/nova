# NOVA — Team Productivity Platform (Frontend)

Plan. Collaborate. Deliver.

This is the complete **frontend UI** for NOVA, a project management dashboard.
It's built with mock data so it runs and looks fully real right now, but every
data access goes through one file (`src/lib/api.js`) so wiring up a real
backend later is a small, contained change — not a rewrite.

## Tech stack

- **React 19** + **Vite** — app shell and build tooling
- **React Router v6** — client-side routing (`/`, `/dashboard`, `/projects`, `/projects/:id`, `/team`, `/calendar`, `/activity`, `/settings`)
- **Tailwind CSS** — styling, with a custom design-token palette in `tailwind.config.js`
- **Framer Motion** — page transitions, layout animations, hover/tap micro-interactions
- **Recharts** — the productivity trend chart on the dashboard
- **lucide-react** — icon set

## Getting started

```bash
npm install
npm run dev       # starts a local dev server, usually http://localhost:5173
npm run build     # production build, output in dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/     Reusable UI: Sidebar, TopBar, Layout, cards, ui primitives
  pages/          One file per route/screen (Login, Dashboard, Projects, ...)
  data/           mockData.js — the shape of every entity (project, task, member...)
  lib/api.js      The ONLY place that "talks to the backend"
```

## Connecting a real backend

Everything in the UI calls `api.*` methods from `src/lib/api.js` — no
component ever imports `mockData.js` directly for live logic (the login
screen animates two hard-coded example projects for visual flavor only).

To go live:

1. Stand up your backend and note its base URL.
2. Create a `.env` file in the project root:
   ```
   VITE_API_BASE_URL=https://api.yournova.app
   ```
3. In `src/lib/api.js`, each method already has the mock branch **and** a
   real `request(...)` call showing the endpoint shape (`/auth/login`,
   `/projects`, `/projects/:id/tasks`, `/team`, `/calendar/events`,
   `/activity`, `/notifications`, `/dashboard/summary`). Remove the mock
   branch, keep the real call.
4. Add authentication: store the token from `api.auth.login()` (e.g. in
   `localStorage` or a context) and attach it as a `Bearer` header inside the
   shared `request()` helper.
5. Swap the `setTimeout` in `src/pages/Login.jsx`'s `handleSubmit` for a real
   `await api.auth.login(email, password)` call.

No other file needs to change — every page already renders from whatever
`api.*` resolves to.

## Design notes

- Dark, near-black base (`#08080D`) with an indigo/violet primary accent and
  a jade/teal secondary accent — avoids the generic "cream + terracotta" or
  "black + neon green" AI-default palettes.
- Glassmorphism panels (`.glass`, `.glass-strong` in `index.css`) for the
  mobile sidebar drawer, dropdowns, and the login card.
- Motion is deliberate: shared-layout active-state pills in nav/tabs/filters,
  one page-transition per route change, animated progress bars/rings on
  mount — not scattered hover effects on every element.
- Fully responsive: collapsible drawer sidebar under `lg`, stacking grids,
  touch-friendly tap targets.
