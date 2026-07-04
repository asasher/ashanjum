# ashanjum.com

Personal-brand umbrella site and the selling machine for the AI business.

- `/` — umbrella page (two tiers: done-with-you / done-for-you)
- `/delivery-margin-recovery` — H1 lane: Delivery Margin Recovery Sprint
- `/review-insights` — H2 lane: Review Insights Triage

## Stack

Next.js (App Router) · React · Tailwind v4 · Convex (lead capture) · Vercel · bun.

Forms write to our own Convex DB — no form SaaS, ever.

## Develop

```sh
bun install
bunx convex dev   # first run provisions the deployment and writes .env.local
bun run dev
```

Without `NEXT_PUBLIC_CONVEX_URL` set, the lead form falls back to a mailto
link so the site still builds and deploys.

## Deploy

Vercel via git: pushes to non-main branches get preview deployments; `main`
goes to production. Set `NEXT_PUBLIC_CONVEX_URL` in Vercel env for the form,
and run `bunx convex deploy` for the production Convex deployment.
