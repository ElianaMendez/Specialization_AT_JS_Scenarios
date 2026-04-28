# Specialization_AT_JS_Scenarios

UI test automation framework built with WebdriverIO and Cucumber + TypeScript, targeting the [Practice Software Testing](https://practicesoftwaretesting.com/) web application. This repository evolves across three branches, each representing a distinct architectural stage.

---

## Branch Overview

| Branch | Stage | Description |
|--------|-------|-------------|
| `main` | Initial setup | WDIO framework with BDD scenarios, multi-browser headless execution |
| `feature/refactor` | Architecture | Page Object Model, layered architecture, DRY/KISS/YAGNI principles |
| `feature/typescript` | Migration | Cucumber + TypeScript, tagged feature files, CI integration (GitLab CI + GitHub Actions) |

---

## Branch: `main` — WDIO Framework

### What it demonstrates
- WebdriverIO setup from scratch with BDD configuration
- 8 automated scenarios derived from Gherkin specs (sign-up, login, profile, product, cart, checkout, and more)
- Headless execution in Chrome, Firefox, and Edge
- Parallel execution with multiple concurrent instances
- Automatic retry — tests re-run before being marked as failed

### Tech stack
`WebdriverIO` · `JavaScript` · `Node.js` · `Chrome` · `Firefox` · `Edge`

### Project structure

```
src/
├── config/
│   └── wdio.conf.js
├── features/
│   └── 6 × .feature files
├── pageObjects/
│   └── 7 × .page.js files
├── step-definitions/
│   └── 6 × .steps.js files
└── utils/
    └── DataGenerator.js
.gitignore
package.json
README.md
```

### Run tests

```bash
npm install

# Run all tests
npm test
```

---

## Branch: `feature/refactor` — Page Object Model & Layered Architecture

### What it demonstrates
- Full refactor to the **Page Object Model** pattern — each page of the app has a dedicated class
- **3-layer architecture** separating concerns clearly:
  - `core/` — reusable base classes, helpers, and utilities not tied to this specific app
  - `business/` — page objects and step definitions specific to Practice Software Testing
  - `test/` — feature files, test data, and configuration
- DRY, KISS, and YAGNI principles applied throughout — no duplicated selectors, no unnecessary abstractions

### Project structure

```
src/
├── core/
│   ├── base/          # BasePage class
│   ├── config/        # wdio.conf.js
│   └── helpers/       # browser.helper.js · wait.helper.js
├── business/
│   └── po/
│       ├── pages/           # 6 × .page.js files
│       └── step-definitions/ # 6 × .steps.js files
└── test/
    ├── data/          # DataGenerator.js
    └── features/      # 6 × .feature files
.gitignore
package.json
README.md
```

### Run tests

```bash
git checkout feature/refactor
npm install
npm test
```

---

## Branch: `feature/typescript` — Cucumber + TypeScript + CI

### What it demonstrates
- Migration of all UI tests to **Cucumber + TypeScript** — pages, step definitions, helpers, data generators, and configuration fully typed
- Feature files written in Gherkin with `@tags` for targeted execution
- Step definitions fully typed with TypeScript
- CI-aware configuration — sequential execution and Chrome-only in CI, parallel multi-browser locally
- Screenshot capture on test failure via `afterStep` hook
- Integrated with **GitLab CI** and **GitHub Actions** — tests run automatically on every push

### Project structure

```
src/
├── core/
│   ├── base/          # base.page.ts
│   └── helpers/       # browser.helper.ts · wait.helper.ts
├── business/
│   └── po/
│       ├── pages/           # 6 × .page.ts files
│       └── step-definitions/ # 6 × .steps.ts files
└── test/
    ├── data/          # DataGenerator.ts
    └── features/      # 6 × .feature files
.gitignore
.gitlab-ci.yml
.github/
└── workflows/
    └── ui-tests.yml   # GitHub Actions pipeline
package.json
README.md
tsconfig.json
wdio.conf.ts
```

### Run tests

```bash
git checkout feature/typescript
npm install

# Run all tests
npm test

# Run smoke tests only (cleans reports first)
npm run test:smoke

# Run by feature
npm run test:register
npm run test:login
npm run test:profile
npm run test:homeProduct
npm run test:basket
npm run test:checkout

# Run login tests by tag
npm run test:validLogin
npm run test:invalidLogin
```

### Available tags

| Tag | Covers |
|-----|--------|
| `@smoke` | Critical happy-path scenarios across all features |
| `@validLogin` | Successful login with valid credentials |
| `@invalidLogin` | Login attempt with invalid credentials |

### Reports

```bash
# Generate Allure report
npm run report:generate

# Open generated report
npm run report:open

# Serve live report from results
npm run report:serve

# Run smoke tests and open report in one command
npm run test:smoke:report
```

### CI configuration

| Environment | Browsers | Execution | Spec grouping |
|-------------|----------|-----------|---------------|
| Local | Chrome · Firefox · Edge | Parallel | Independent per feature |
| CI (GitLab / GitHub Actions) | Chrome only | Sequential | All features grouped |

CI-specific settings in `wdio.conf.ts`:
- `maxInstances: 1` — single worker in CI
- `connectionRetryTimeout: 240000` — extended connection timeout
- `specFileRetries: 1` with `specFileRetriesDelay: 10` — automatic retry on failure
- Screenshots captured automatically on step failure

---

## Scenarios Covered

All 8 BDD scenarios from the test design phase are automated:

1. User successfully signs up with valid details
2. User logs in successfully with valid credentials
3. User enters invalid credentials
4. User updates profile information successfully
5. User cannot update email address (read-only field)
6. User views details of a selected product
7. User adds a product to the cart
8. User completes checkout with multiple payment methods (Bank Transfer, Credit Card, Cash on Delivery, BNPL, Gift Card)

---

## Prerequisites

- Node.js 18.20.3
- npm 9+
- Chrome, Firefox, and Edge installed locally (for non-headless runs)
- Allure CLI installed globally for report generation (`npm install -g allure-commandline`)
