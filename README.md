# Addintel – Playwright API Test Automation

Automated API test suite for the [Addintel](https://client-staging.addintel.co.uk) platform, built with Playwright and TypeScript.

## Test Coverage

| Module | Description |
|---|---|
| Auth | Login and token validation |
| Mailable Pool | CRUD operations on mailable pool records |
| Exclusion List | Managing exclusion list entries |
| KML | KML file creation and validation |
| Create User | User creation for consultant and admin roles |
| Quotations | Quotation API workflows |

## Tech Stack

- [Playwright](https://playwright.dev/) `^1.60` — test runner and API request context
- TypeScript — strict typing across all tests and page objects
- [@faker-js/faker](https://fakerjs.dev/) — dynamic test data generation
- [AJV](https://ajv.js.org/) — JSON schema validation
- dotenv — environment-based configuration
- GitHub Actions — CI pipeline on push/PR to `main`

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
│   └── api/          # All API spec files
├── playwright.config.ts
└── .github/workflows/playwright.yml
```

## Setup

1. **Install dependencies**
   ```bash
   npm install
   npx playwright install
   ```

2. **Configure environment** — create a `.env` file in the root:
   ```env
   BASE_URL=https://client-staging.addintel.co.uk
   API_BASE_URL=<your-api-base-url>
   consultant_EMAIL=<consultant-email>
   consultant_PASSWORD=<consultant-password>
   Admin_EMAIL=<admin-email>
   Admin_PASSWORD=<admin-password>
   ```

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

## CI / GitHub Actions

Tests run automatically on every push and pull request to `main`. Credentials are stored as GitHub repository secrets:

- `CONSULTANT_EMAIL` / `CONSULTANT_PASSWORD`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- `BASE_URL` / `API_BASE_URL`

The HTML report is uploaded as an artifact and retained for 30 days.
