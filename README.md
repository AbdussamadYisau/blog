# Sammie — Notes & Fieldwork

A real Next.js App Router blog with React, Sanity content, topic filters, search, reading pages, and responsive styling.

## Run

Use Node 22+. Run `npm install`, then `npm run dev`. `npm run build` produces the static `out/` site.

## Connect Sanity

1. Create a project at https://www.sanity.io/manage with a **public** production dataset. Keep writes authenticated.
2. Copy `.env.example` to `.env.local` and enter its project ID and dataset.
3. In `studio/`, copy `.env.example` to `.env.local`, enter the same ID, run `npm install` and `npm run dev`. Log in to Sanity, create a Post, generate its slug, and publish.
4. Run `npm run deploy` in `studio/` to host the authenticated editor with Sanity. Put its HTTPS URL in `NEXT_PUBLIC_SANITY_STUDIO_URL` in the root environment.
5. Add the blog origin and localhost origin to your Sanity project's API CORS origins. Public read requests do not need a token. Never expose a write token through NEXT_PUBLIC variables.
6. Build and deploy the blog once after setting the environment. Afterward, create/edit/publish from Studio without Git pushes. Browser reads fetch published content from the Sanity CDN; allow a short cache delay and refresh the blog to see changes.

Without a project ID, explicitly labeled sample articles demonstrate the design. With a project ID, only real published articles are shown; failures do not fall back to samples. Future-dated posts remain hidden until their publication date.

## Hosting and SEO

This preview uses a Next.js static export and client-side Sanity queries so new posts work without rebuilding. Reading links use `/post/?slug=...`. It has site metadata, but not server-rendered per-post metadata. For an SEO-focused public production blog, deploy Next.js with server support (for example Vercel), replace the reading route with `/posts/[slug]`, and use Sanity-triggered revalidation and per-post metadata. The included Sanity schema and content model transfer directly.
