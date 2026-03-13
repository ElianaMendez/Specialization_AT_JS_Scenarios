# Specialization_AT_JS_Scenarios

UI test automation framework built with WebdriverIO and Cucumber + TypeScript, targeting the [Practice Software Testing](https://practicesoftwaretesting.com/) web application. This repository evolves across three branches, each representing a distinct architectural stage.

---

## Branch Overview

| Branch | Stage | Description |
|--------|-------|-------------|
| `main` | Initial setup | WDIO framework with BDD scenarios, multi-browser headless execution |
| `feature/refactor` | Architecture | Page Object Model, layered architecture, DRY/KISS/YAGNI principles |
| `feature/typescript` | Migration | Cucumber + TypeScript, tagged feature files, CI integration |

---

## Branch: `main` — WDIO Framework

### What it demonstrates
- WebdriverIO setup from scratch with BDD configuration
- 8 automated scenarios derived from Gherkin specs (sign-up, login, profile, product, cart, checkout, search, and more)
- Headless execution in Chrome, Firefox, and Safari
- Parallel execution with 2 concurrent instances
- Automatic retry — tests re-run up to 2 times before being marked as failed

### Tech stack
`WebdriverIO` · `JavaScript` · `Node.js` · `Chrome` · `Firefox` · `Safari`

### Run tests

```bash
npm install

# Run all tests (headless, parallel)
npm test

# Run in a specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari
```

---

## Branch: `feature/refactor` — Page Object Model & Layered Architecture

### What it demonstrates
- Full refactor to the **Page Object Model** pattern — each page of the app has a dedicated class
- **3-layer architecture** separating concerns clearly:
  - `core/` — reusable base classes, helpers, and utilities not tied to this specific app
  - `business/` — page objects and actions specific to Practice Software Testing
  - `tests/` — spec files and WDIO configuration
- DRY, KISS, and YAGNI principles applied throughout — no duplicated selectors, no unnecessary abstractions

### Project structure

```
├── core/
│   ├── base/          # BasePage class, shared actions
│   └── helpers/       # Reusable utilities
├── business/
│   ├── pages/         # Page Object classes per page/component
│   └── actions/       # Business-level action sequences
├── tests/
│   ├── specs/         # Test spec files
│   └── wdio.conf.js   # WDIO configuration
└── package.json
```

### Run tests

```bash
git checkout feature/refactor
npm install
npm test
```

---

## Branch: `feature/typescript` — Cucumber + TypeScript

### What it demonstrates
- Migration of all UI tests to **Cucumber + TypeScript**
- Feature files written in Gherkin with `@tags` for targeted execution
- Step definitions fully typed with TypeScript
- CLI script to run tests filtered by tag
- Integrated with CI pipeline — tests run on every push

### Run tests

```bash
git checkout feature/typescript
npm install

# Run all Cucumber tests
npm run test:cucumber

# Run by tag
npm run test:cucumber -- --tags @login
npm run test:cucumber -- --tags @checkout
npm run test:cucumber -- --tags @smoke
```

### Available tags

| Tag | Covers |
|-----|--------|
| `@smoke` | Critical happy-path scenarios |
| `@login` | Sign-in and sign-up flows |
| `@profile` | User profile management |
| `@product` | Product details and search |
| `@cart` | Basket and add-to-cart flows |
| `@checkout` | Full checkout with multiple payment methods |

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

- Node.js 18+
- npm 9+
- Chrome, Firefox, and Safari installed locally (for non-headless runs)

