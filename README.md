# Lost & Found Demo

A standalone React demo for previewing the Lost & Found experience as a student,
staff member, or administrator. Demo records and edits live in browser memory;
they are reset when the page is refreshed.

## Run locally

Requires Node.js 20 or newer.

```sh
npm ci
npm run dev
```

Create and locally preview the production build:

```sh
npm run build
npm run preview
```

## Deploy to Vercel

1. Import this repository into Vercel.
2. Keep the project root set to the repository root.
3. Use the detected Vite framework settings, or set the build command to
   `npm run build` and the output directory to `dist`.
4. Deploy. No environment variables or backend services are required.

The included `vercel.json` configures the static build, SPA fallback for direct
URL requests, security response headers, and long-lived caching for generated
assets. Vercel creates preview deployments for non-production branches and a
production deployment from the configured production branch.
