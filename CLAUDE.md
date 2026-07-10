# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: this is Next.js 16, not the Next.js in your training data

This project runs **Next.js 16.2.10** with **React 19.2.4**, released after your training cutoff. Several conventions differ from what you'd normally assume, and `next build`/`next dev` will fail or silently misbehave if you use the old patterns. Before writing route, config, image, caching, or middleware code, check `node_modules/next/dist/docs/01-app/` — full docs are vendored locally (`02-guides/upgrading/version-16.md` and `version-15.md` cover the breaking changes in detail).

Key differences to remember without needing to re-read the docs every time:

- **`middleware.ts` is renamed to `proxy.ts`**, and the exported function must be named `proxy` (not `middleware`). There is no middleware/proxy file in this repo yet — if you add one, use the new convention. The Edge runtime is not supported in `proxy`; it always runs on Node.js.
- **Async Request APIs are fully async, no sync fallback**: `cookies()`, `headers()`, `draftMode()`, and `params`/`searchParams` in pages, layouts, and route handlers must all be `await`ed. There is no legacy synchronous access.
- **Turbopack is the default bundler** for both `next dev` and `next build`. Don't add `--turbopack` flags; they're unnecessary. A custom Webpack config now makes `next build` fail unless you pass `--webpack` explicitly.
- **`next lint` has been removed.** Linting is invoked via the ESLint CLI directly (see `npm run lint`, which calls `eslint`). `next build` no longer runs lint as part of the build.
- **ESLint uses flat config** (`eslint.config.mjs`), not `.eslintrc`.
- **`next/image`** defaults changed: `images.minimumCacheTTL` is now 4 hours, `images.qualities` defaults to `[75]` only, local images with query strings need `images.localPatterns[].search` configured, and `images.domains` is deprecated in favor of `images.remotePatterns`.
- **Parallel route slots require an explicit `default.js`** — builds fail without one if you add parallel routes (`@slot` folders).
- **`revalidateTag`** now requires a second `cacheLife` profile argument; for immediate read-your-writes semantics use `updateTag` instead (both from `next/cache`).
- **Turbopack config lives at the top-level `turbopack` key** in `next.config.ts`, not under `experimental.turbopack`.

If you hit an error that looks like a Next.js API doesn't exist or behaves unexpectedly, check the vendored docs before assuming it's a bug — it's more likely a v16 API change.

## Commands

```bash
npm run dev      # start dev server (Turbopack, outputs to .next/dev)
npm run build    # production build (Turbopack by default)
npm run start    # run the production build
npm run lint     # eslint . (flat config, eslint.config.mjs)
```

There is no test runner configured in this repository yet.

## Architecture

This is a freshly scaffolded App Router project (`create-next-app`) with no application code beyond the default template — treat structural decisions (data layer, routing structure, component organization) as still open.

- **App Router** under `app/`: `app/layout.tsx` is the root layout (loads Geist fonts via `next/font/google`, sets `h-full`/`min-h-full` flex layout), `app/page.tsx` is the home route.
- **Path alias**: `@/*` maps to the project root (`tsconfig.json`), not to `src/`.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (`postcss.config.mjs`), global styles in `app/globals.css`. There is no `tailwind.config.*` file — v4 is configured via CSS/PostCSS, not a JS config file.
- **TypeScript**: strict mode on, `moduleResolution: bundler`, no `src/` directory in use.
