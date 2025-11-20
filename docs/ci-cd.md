# CI/CD Pipeline Documentation

Comprehensive guide for the CI/CD pipeline using GitHub Actions for the CareFlow Frontend application.

## 📋 Table of Contents

- [Overview](#overview)
- [Workflows](#workflows)
- [Setup Instructions](#setup-instructions)
- [Branch Strategy](#branch-strategy)
- [Deployment Process](#deployment-process)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Overview

The CI/CD pipeline automates testing, building, and deployment using GitHub Actions. It ensures code quality and enables rapid, reliable deployments.

### Key Features

- ✅ Automated linting and formatting checks
- ✅ TypeScript type checking
- ✅ Automated testing with coverage reports
- ✅ Build verification
- ✅ Security scanning (CodeQL & Dependency Review)
- ✅ Automated deployment to production
- ✅ Parallel job execution for speed

---

## Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers:**

- Push to `main` branch
- Pull requests to `main` branch

**Jobs:**

#### Lint Job

- Runs ESLint checks
- Verifies code formatting with Prettier
- **Duration:** ~30 seconds

#### Type Check Job

- Runs TypeScript compiler
- Ensures no type errors
- **Duration:** ~20 seconds

#### Test Job

- Runs Vitest test suite
- Generates coverage report
- Uploads coverage to Codecov
- **Duration:** ~1 minute

#### Build Job

- Creates production build
- Verifies build succeeds
- Uploads build artifacts
- **Duration:** ~1 minute

**Total Duration:** ~2 minutes (jobs run in parallel)

### 2. Deploy Workflow (`deploy.yml`)

**Triggers:**

- Push to `main` branch (after CI passes)
- Manual trigger via workflow_dispatch

**Jobs:**

#### Deploy Job

- Builds production bundle
- Deploys to hosting platform
- Creates deployment summary
- **Requires:** Production environment approval

#### Smoke Test Job

- Runs post-deployment health checks
- Verifies deployment success

**Deployment Platforms Supported:**

- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Custom platforms

### 3. Dependency Review (`dependency-review.yml`)

**Triggers:**

- Pull requests to `main` branch

**Purpose:**

- Reviews dependency changes
- Checks for security vulnerabilities
- Blocks PRs with critical vulnerabilities
- Comments summary in PR

### 4. CodeQL Analysis (`codeql.yml`)

**Triggers:**

- Push to `main` branch
- Pull requests to `main` branch
- Weekly schedule (Mondays at 00:00 UTC)

**Purpose:**

- Security code scanning
- Identifies vulnerabilities
- Detects code quality issues
- Creates security alerts

---

## Setup Instructions

### 1. Repository Setup

#### Enable GitHub Actions

1. Go to repository **Settings** → **Actions** → **General**
2. Select "Allow all actions and reusable workflows"
3. Click **Save**

#### Configure Branch Protection

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - Required status checks:
     - `lint`
     - `type-check`
     - `test`
     - `build`
   - ✅ Require branches to be up to date before merging
   - ❌ Do not allow force pushes
   - ❌ Do not allow deletions

### 2. Environment Configuration

#### Create Production Environment

1. Go to **Settings** → **Environments**
2. Click **New environment**
3. Name: `production`
4. Configure protection rules:
   - ✅ Required reviewers (add yourself or team)
   - ⏱️ Wait timer: 0 minutes (or as needed)
5. Click **Save protection rules**

### 3. Secrets Configuration

#### Repository Secrets

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

**Required Secrets:**

```
VITE_API_URL
Description: Backend API URL
Example: https://api.careflow.app
```

**Optional Secrets:**

```
CODECOV_TOKEN
Description: Codecov upload token for coverage reports
Get from: https://codecov.io
```

#### Environment Secrets (Production)

Go to **Settings** → **Environments** → **production** → **Add secret**

**For Vercel:**

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

**For Netlify:**

```
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
```

**For AWS:**

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
S3_BUCKET
CLOUDFRONT_DISTRIBUTION_ID
```

### 4. Enable Deployment Platform

#### Option A: Vercel

1. Uncomment Vercel deployment step in `deploy.yml`
2. Get tokens from Vercel dashboard
3. Add secrets to GitHub

#### Option B: Netlify

1. Uncomment Netlify deployment step in `deploy.yml`
2. Get tokens from Netlify dashboard
3. Add secrets to GitHub

#### Option C: AWS S3

1. Uncomment AWS deployment steps in `deploy.yml`
2. Configure AWS credentials
3. Add secrets to GitHub

### 5. Enable CodeQL

1. Go to **Settings** → **Code security and analysis**
2. Click **Set up** for CodeQL analysis
3. GitHub will automatically use the workflow file

---

## Branch Strategy

### Single Branch Workflow

```
feature branch → PR → CI checks → merge to main → deploy to production
```

### Development Process

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes & Commit**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push to GitHub**

   ```bash
   git push origin feature/my-feature
   ```

4. **Create Pull Request**

   - CI workflow runs automatically
   - All checks must pass
   - Request review

5. **Merge to Main**
   - After approval and passing checks
   - Deployment workflow triggers automatically

---

## Deployment Process

### Automatic Deployment

When code is merged to `main`:

1. **CI Checks Run**

   - Lint, type-check, test, build
   - Must all pass

2. **Deployment Triggered**

   - Requires manual approval (production environment)
   - Reviewer approves deployment

3. **Build & Deploy**

   - Production build created
   - Deployed to hosting platform

4. **Smoke Tests**
   - Post-deployment health checks
   - Verify deployment success

### Manual Deployment

Trigger deployment manually:

1. Go to **Actions** tab
2. Select **Deploy to Production** workflow
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow**

### Rollback Process

If deployment fails:

1. **Quick Rollback**

   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Platform Rollback**
   - Vercel: Use dashboard to rollback
   - Netlify: Use dashboard to rollback
   - AWS: Redeploy previous version

---

## Environment Variables

### Build-time Variables

Set in GitHub Secrets and accessed during build:

```env
VITE_API_URL=https://api.careflow.app
```

### Adding New Variables

1. Add to GitHub Secrets
2. Update `deploy.yml`:
   ```yaml
   env:
     VITE_API_URL: ${{ secrets.VITE_API_URL }}
     VITE_NEW_VAR: ${{ secrets.VITE_NEW_VAR }}
   ```

---

## Troubleshooting

### CI Checks Failing

#### Lint Errors

```bash
# Run locally to see errors
npm run lint

# Auto-fix issues
npm run lint:fix
```

#### Type Errors

```bash
# Check types locally
npx tsc --noEmit
```

#### Test Failures

```bash
# Run tests locally
npm test

# Run specific test
npm test -- FormField.test.tsx
```

#### Build Failures

```bash
# Build locally
npm run build
```

### Deployment Failures

#### Check Workflow Logs

1. Go to **Actions** tab
2. Click on failed workflow
3. Click on failed job
4. Review error messages

#### Common Issues

**Missing Secrets**

- Verify all required secrets are set
- Check secret names match exactly

**Environment Not Configured**

- Ensure production environment exists
- Check protection rules are set

**Build Errors**

- Check environment variables
- Verify API URL is correct

### Coverage Upload Failures

If Codecov upload fails:

- It won't fail the CI (configured with `fail_ci_if_error: false`)
- Check `CODECOV_TOKEN` is set correctly
- Verify Codecov integration is enabled

---

## Best Practices

### 1. Keep CI Fast

- Jobs run in parallel
- Dependencies are cached
- Use `npm ci` instead of `npm install`

### 2. Fail Fast

- Lint and type-check run first
- Stop on first failure
- Clear error messages

### 3. Security

- Regular dependency updates
- CodeQL scanning enabled
- Dependency review on PRs
- Secrets never in code

### 4. Code Quality

- Required status checks
- Code review required
- Coverage reporting
- Automated testing

### 5. Deployment Safety

- Manual approval required
- Smoke tests after deployment
- Easy rollback process
- Deployment notifications

---

## Workflow Files

### File Structure

```
.github/
└── workflows/
    ├── ci.yml                  # Main CI workflow
    ├── deploy.yml              # Production deployment
    ├── dependency-review.yml   # Security checks
    └── codeql.yml             # Code scanning
```

### Maintenance

#### Update Node.js Version

Update in all workflow files:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20' # Update this
```

#### Update Actions

Periodically update action versions:

```yaml
uses: actions/checkout@v4  # Check for v5
uses: actions/setup-node@v4  # Check for updates
```

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Vercel Deployment](https://vercel.com/docs/deployments/git)
- [Netlify Deployment](https://docs.netlify.com/site-deploys/overview/)
- [CodeQL](https://codeql.github.com/docs/)

---
