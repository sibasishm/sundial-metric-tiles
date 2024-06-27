# Instructions

This repo is bootstraped using the minimal React + TS setup using Vite which
comes up with it's own opiniated `tsconfig` and `eslint` setup.

## Running locally

Just clone and install the dependencies. Then run the dev command to run it
locally.

```sh
git clone <REPO_URL>
pnpm install
pnpm dev
```

## Please Note

- Select and Button components are taken from shadcn/ui for brevity
- Recharts was preferred over Highcharts due to past familiarity, and simplicty
- vite server proxy and vercel redirects are setup to solve the local CORS error
