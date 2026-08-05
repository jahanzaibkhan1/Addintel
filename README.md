# Playwright API Automation Suite — Addintel Platform

[![CI](https://github.com/jahanzaibkhan1/Addintel/actions/workflows/playwright.yml/badge.svg)](https://github.com/jahanzaibkhan1/Addintel/actions/workflows/playwright.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.60%2B-green?logo=playwright)

End-to-end API test automation suite for the [Addintel](https://client-staging.addintel.co.uk) platform, covering authentication, user management, quotations, and data operations — with CI/CD via GitHub Actions

---

## Test Coverage

| Module         | Description                                   |
| -------------- | --------------------------------------------- |
| Auth           | Login and token validation                    |
| Mailable Pool  | CRUD operations on mailable pool records      |
| Exclusion List | Managing exclusion list entries               |
| KML            | KML file creation and validation              |
| Create User    | User creation for consultant and admin roles  |
| Quotations     | Quotation API workflows                       |

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) `^1.60` | Test runner and API request context |
| TypeScript (strict) | Type safety across all tests and utilities |
| [@faker-js/faker](https://fakerjs.dev/) | Dynamic test data generation |
| [AJV](https://ajv.js.org/) | JSON schema validation |
| dotenv | Environment-based configuration |
| GitHub Actions | CI pipeline on push/PR to `main` |

---

## Project Structure

```
├── src/
│   ├── api/          # API client classes (auth, user, quotations, etc.)
│   ├── pages/        # Page object models (login, dashboard)
│   ├── fixtures/     # Playwright fixture setup with role-based auth
│   ├── helpers/      # Shared assertion helpers
│   ├── data/         # Static test data
│   └── utils/        # Logger and date utilities
├── tests/
│   └── api/          # API spec files
├── playwright.config.ts
└── .github/workflows/playwright.yml
```

---

## Setup

### 1. Install dependencies

```bash
npm install
npx playwright install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
BASE_URL=https://client-staging.addintel.co.uk
API_BASE_URL=<your-api-base-url>
consultant_EMAIL=<consultant-email>
consultant_PASSWORD=<consultant-password>
Admin_EMAIL=<admin-email>
Admin_PASSWORD=<admin-password>
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Debug mode
npm run test:debug

# View HTML report
npm run report
```

---

## Branching Strategy

This project follows Git Flow:

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch — merge features here first |
| `release/1.0` | Stabilization before merging to `main` |
| `feature/*` | New features branched off `develop` |
| `hotfix/*` | Emergency fixes branched off `main` |

---

## CI / GitHub Actions

Tests run automatically on every push and pull request to `main`. Credentials are stored as GitHub repository secrets:

- `CONSULTANT_EMAIL` / `CONSULTANT_PASSWORD`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- `BASE_URL` / `API_BASE_URL`

The HTML test report is uploaded as a workflow artifact and retained for 30 days.