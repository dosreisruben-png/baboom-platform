# Engineering Infrastructure

This document captures all infrastructure decisions for the SA and PT platforms.

---

## Repo Structure

**Decision:** Monorepo (Turborepo + pnpm workspaces)

**Rationale:** Two platforms share tooling, config, and potentially UI components. Monorepo avoids config drift, makes cross-platform refactors easier, and enables shared CI caching.

```
platform/
├── apps/
│   ├── platform-sa/          # South Africa platform
│   └── platform-pt/          # Portugal platform
├── packages/
│   ├── config/               # Shared ESLint, TSConfig
│   ├── ui/                   # Shared component library (TBD)
│   └── database/             # Shared DB client/schema (TBD)
├── infra/
│   └── terraform/            # AWS infra (for DB, secrets at scale — not compute)
│       ├── modules/
│       │   └── secrets/      # AWS Secrets Manager (optional future use)
│       └── envs/
└── .github/workflows/        # CI/CD pipelines
```

---

## Tech Stack

| Concern            | Decision                         | Notes                                 |
| ------------------ | -------------------------------- | ------------------------------------- |
| Language           | TypeScript (strict)              | All packages + apps                   |
| Package manager    | pnpm 9                           | Faster installs, disk efficient       |
| Monorepo tooling   | Turborepo 2                      | Remote caching, parallel task running |
| Runtime            | Node.js 20 LTS                   | Engine pinned in package.json         |
| Framework          | **TBD** (pending TRO-2)          | Next.js or similar, decided post-TRO-2|
| Database           | **TBD** (pending TRO-2)          | PostgreSQL likely candidate           |
| Hosting            | **Vercel**                       | Both platforms; AWS revisited at scale|
| CI/CD              | GitHub Actions                   | Branch-based promotions               |
| Linting            | ESLint + @typescript-eslint      | Shared config in `packages/config`    |
| Formatting         | Prettier                         | Auto-fixed in pre-commit hook         |
| Git hooks          | Husky + lint-staged              | Blocks bad commits locally            |
| Commit convention  | Conventional Commits             | `feat:`, `fix:`, `chore:`, etc.       |

---

## Hosting — Vercel

Both platforms deploy to Vercel. AWS compute (ECS, Lambda, App Runner) is deferred until scale requires it.

| Platform | Vercel Project | Environment               |
| -------- | -------------- | ------------------------- |
| SA       | `baboom-sa`    | Production (main), Preview (staging) |
| PT       | `baboom-pt`    | Production (main), Preview (staging) |

**Note on data residency:** Vercel's edge network is global. For POPIA (SA) and GDPR (PT) compliance at scale, regional data storage (database, object storage) will need to be revisited. For MVP, Vercel's DPA covers GDPR adequately.

---

## Environments

| Environment | Branch    | Deploy trigger       | Notes                         |
| ----------- | --------- | -------------------- | ----------------------------- |
| `dev`       | feature/* | Manual / local       | Per-engineer local dev        |
| `preview`   | staging   | Push to `staging`    | Vercel preview deployment     |
| `prod`      | main      | Push to `main`       | Vercel production deployment  |

---

## CI/CD

Pipeline: `.github/workflows/`

- **`ci.yml`** — runs on all PRs and pushes to `main`/`staging`
  - lint → typecheck → test → build
  - Uses Turborepo remote cache (set `TURBO_TOKEN` + `TURBO_TEAM` in GitHub vars)
- **`deploy-sa.yml`** — deploys SA platform to Vercel project `baboom-sa`
- **`deploy-pt.yml`** — deploys PT platform to Vercel project `baboom-pt`

### Required GitHub Secrets

| Secret                  | Description                            |
| ----------------------- | -------------------------------------- |
| `VERCEL_TOKEN`          | Vercel personal access token           |
| `VERCEL_ORG_ID`         | Vercel team/org ID                     |
| `VERCEL_PROJECT_ID_SA`  | Vercel project ID for `baboom-sa`      |
| `VERCEL_PROJECT_ID_PT`  | Vercel project ID for `baboom-pt`      |
| `TURBO_TOKEN`           | Turborepo remote cache token (optional)|

### Finding your Vercel IDs

```bash
# Install Vercel CLI and link each app
cd apps/platform-sa && vercel link  # creates .vercel/project.json with projectId + orgId
cd apps/platform-pt && vercel link
```

---

## Secret Management

| Environment | Mechanism                    |
| ----------- | ---------------------------- |
| Local dev   | `.env.local` (gitignored)    |
| CI/Deploy   | GitHub Actions Secrets       |
| Production  | Vercel Environment Variables |

Set production secrets in the Vercel dashboard under each project → Settings → Environment Variables. These are injected at build/runtime automatically.

---

## Pending Decisions (unblocked by TRO-2)

The following require product type confirmation before being finalized:

- [ ] Frontend framework (Next.js vs Remix vs other — depends on product type)
- [ ] Database engine + ORM (PostgreSQL + Drizzle/Prisma, or NoSQL)
- [ ] Auth provider (Clerk, Auth0, NextAuth — depends on compliance needs)
- [ ] Test runner (Vitest vs Jest — minor, can decide now if needed)
- [ ] Shared UI component library (needed only if both platforms share UI)

---

## First-Time Setup Checklist

### Vercel
- [x] Board has existing Vercel account
- [ ] Create project `baboom-sa` in Vercel dashboard, link to `apps/platform-sa`
- [ ] Create project `baboom-pt` in Vercel dashboard, link to `apps/platform-pt`
- [ ] Get `VERCEL_TOKEN` from Vercel → Account Settings → Tokens
- [ ] Get `VERCEL_ORG_ID` from Vercel → Team Settings → General
- [ ] Get `VERCEL_PROJECT_ID_SA` and `VERCEL_PROJECT_ID_PT` via `vercel link` in each app dir

### GitHub
- [x] Repo created: https://github.com/dosreisruben-png/baboom-platform
- [ ] Add all Vercel secrets to GitHub repo → Settings → Secrets and variables → Actions
- [ ] Enable branch protection on `main` and `staging` (require CI pass + review)
- [ ] Set `TURBO_TOKEN` and `TURBO_TEAM` variables for remote caching (optional but recommended)

### Local dev
- [ ] Install pnpm: `npm install -g pnpm@9`
- [ ] Install Node 20 (recommend: `nvm install 20`)
- [ ] `pnpm install`
- [ ] Copy `.env.example` → `.env.local` and fill in local values
- [ ] `pnpm husky install` (sets up git hooks)
