# ashanjum.com

A single-page credibility site, in the same design language as the agentic
delivery proposal deck. One job: when someone lands here off the deck or a
conversation, they find the person behind it — track record, proof, the
workflow published in the open.

Everything the site used to be (lanes, subdomain routing, lead capture)
lives in git history.

## Stack

Next.js (App Router) · React · Tailwind v4 · Vercel · bun. Fully static.

## Develop

```sh
bun install
bun run dev
```

## Deploy

Vercel via git: pushes to non-main branches get preview deployments; `main`
goes to production.
