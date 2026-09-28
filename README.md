# devops-blog2

DevOps blog built with [Astro](https://astro.build/).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the build locally before deploying   |

## Deployment (GitHub Pages)

Live site: **https://toannd021104.github.io/devops-blog2/**

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`):

- Every push to `main` builds the site with Node 22 and publishes `./dist` to GitHub Pages.
- You can also trigger it manually from the repo's **Actions** tab (workflow_dispatch).

Because the site is served under the `/devops-blog2/` sub-path, `astro.config.mjs` sets
`base: "/devops-blog2"`. Internal links go through the `withBase()` helper in
`src/utils/url.ts` so they resolve correctly. If the repo is ever renamed or moved to a
custom domain, update `site` and `base` in `astro.config.mjs` (and `SITE.url` in
`src/consts.ts`) accordingly.
