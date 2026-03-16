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
│   └── terraform/
│       ├── modules/          # Reusable Terraform modules
│       │   ├── networking/
│       │   └── secrets/
│       └── envs/
│           ├── dev/sa/       # SA dev environment
│           ├── dev/pt/       # PT dev environment
│           ├── staging/sa/   # SA staging environment
│           ├── staging/pt/   # PT staging environment
│           ├── prod/sa/      # SA production
│           └── prod/pt/      # PT production
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
| IaC                | Terraform 1.7+                   | HCL, modular                          |
| CI/CD              | GitHub Actions                   | Branch-based promotions               |
| Linting            | ESLint + @typescript-eslint      | Shared config in `packages/config`    |
| Formatting         | Prettier                         | Auto-fixed in pre-commit hook         |
| Git hooks          | Husky + lint-staged              | Blocks bad commits locally            |
| Commit convention  | Conventional Commits             | `feat:`, `fix:`, `chore:`, etc.       |

---

## Cloud & Regions

| Platform | Region          | Location       | Compliance   |
| -------- | --------------- | -------------- | ------------ |
| SA       | `af-south-1`    | Cape Town, SA  | POPIA        |
| PT       | `eu-south-2`    | Spain (EU)     | GDPR         |

**Data residency:** Production data stays within its regional boundary. No cross-region replication of personal data.

---

## Environments

| Environment | Branch    | Deploy trigger       | Notes                     |
| ----------- | --------- | -------------------- | ------------------------- |
| `dev`       | feature/* | Manual / local       | Per-engineer local dev    |
| `staging`   | staging   | Push to `staging`    | Pre-prod integration test |
| `prod`      | main      | Push to `main`       | Requires passing CI       |

---

## CI/CD

Pipeline: `.github/workflows/`

- **`ci.yml`** — runs on all PRs and pushes to `main`/`staging`
  - lint → typecheck → test → build
  - Uses Turborepo remote cache (set `TURBO_TOKEN` + `TURBO_TEAM` in GitHub vars)
- **`deploy-sa.yml`** — deploys SA platform (region: `af-south-1`)
- **`deploy-pt.yml`** — deploys PT platform (region: `eu-south-2`)

Deploy steps use **OIDC** (no static AWS keys). Configure in AWS IAM:
- `AWS_SA_DEPLOY_ROLE_ARN` secret → GitHub OIDC federated role for SA
- `AWS_PT_DEPLOY_ROLE_ARN` secret → GitHub OIDC federated role for PT

---

## Secret Management

| Environment | Mechanism                    |
| ----------- | ---------------------------- |
| Local dev   | `.env.local` (gitignored)    |
| CI          | GitHub Actions Secrets       |
| Staging     | AWS Secrets Manager          |
| Production  | AWS Secrets Manager          |

Secret naming convention in AWS Secrets Manager:
```
/platform-{sa|pt}/{environment}/{secret-name}
# e.g. /platform-sa/prod/database-password
```

Terraform provisions secret placeholders; values are set manually or via deployment pipelines — never in code.

---

## Pending Decisions (unblocked by TRO-2)

The following require product type confirmation before being finalized:

- [ ] Frontend framework (Next.js vs Remix vs other — depends on product type)
- [ ] Database engine + ORM (PostgreSQL + Drizzle/Prisma, or NoSQL)
- [ ] Compute type (ECS Fargate vs Lambda vs App Runner — depends on workload shape)
- [ ] Auth provider (Cognito, Auth0, self-hosted — depends on compliance needs)
- [ ] Test runner (Vitest vs Jest — minor, can decide now if needed)
- [ ] Shared UI component library (needed only if both platforms share UI)

---

## First-Time Setup Checklist

### AWS accounts
- [ ] Create separate AWS accounts for SA (af-south-1) and PT (eu-south-2) or use a single org with separate accounts per region
- [ ] Bootstrap Terraform state: S3 buckets + DynamoDB tables per region
  - SA: bucket `platform-tfstate-sa` in `af-south-1`
  - PT: bucket `platform-tfstate-pt` in `eu-south-2`
- [ ] Create GitHub OIDC IAM roles for CI/CD deploys
- [ ] Add `AWS_SA_DEPLOY_ROLE_ARN` and `AWS_PT_DEPLOY_ROLE_ARN` to GitHub secrets

### GitHub
- [ ] Create repository, push this monorepo
- [ ] Enable branch protection on `main` and `staging` (require CI pass + review)
- [ ] Set `TURBO_TOKEN` and `TURBO_TEAM` variables for remote caching (optional but recommended)
- [ ] Configure GitHub Environments: `sa-prod`, `sa-staging`, `pt-prod`, `pt-staging`

### Local dev
- [ ] Install pnpm: `npm install -g pnpm@9`
- [ ] Install Node 20 (recommend: `nvm install 20`)
- [ ] `pnpm install`
- [ ] Copy `.env.example` → `.env.local` and fill in local values
- [ ] `pnpm husky install` (sets up git hooks)
