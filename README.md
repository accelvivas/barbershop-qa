# Barbershop Website — QA Automation Testing

## 1. Project Overview

This repository is a QA automation and test-documentation portfolio for a previous academic PHP project. It demonstrates traceable test cases, Playwright automation, evidence handling, execution reporting, and defect-reporting practices without overstating coverage.

## 2. Testing Objectives

- Establish a reliable homepage smoke test.
- Document positive, negative, validation, cart, and navigation scenarios.
- Produce repeatable browser-specific results and useful failure diagnostics.
- Maintain evidence and reports that distinguish observed results from planned work.

## 3. Application Under Test

- Application: PHP-Based Barbershop Website (Tipuno Barbershop)
- Local URL: `http://localhost/barbershop-1/`
- Hosting: Local XAMPP environment only; this is not a publicly deployed website.
- Separation: The QA project is contained in `barbershop-qa/`; the PHP application's business logic and database are outside this folder.

## 4. Technologies and Tools

- Playwright 1.64.1
- JavaScript / Node.js
- Chromium, Firefox, and WebKit browser projects
- VS Code
- XAMPP, PHP, and MySQL (confirmed from the application implementation)
- Git and GitHub

## 5. Testing Scope

The current scope includes homepage availability, login scenarios, required-field validation, homepage cart behavior, and the `Learn Our Story` navigation. Payment processing, appointment booking, admin workflows, accessibility auditing, API testing, performance testing, and broad cross-browser regression remain outside the implemented automation scope.

## 6. Test Case Coverage

| ID | Scenario | Current Coverage |
| --- | --- | --- |
| TC-001 | Homepage Loading | Automated |
| TC-002 | Login Using Valid Credentials | Planned / NOT RUN |
| TC-003 | Login Using Invalid Credentials | Planned / NOT RUN |
| TC-004 | Login With Empty Required Fields | Planned / NOT RUN |
| TC-005 | Shopping Cart Functionality | Planned / NOT RUN |
| TC-006 | Learn Our Story Button Functionality | Planned / NOT RUN |

See the [CSV test cases](./test-cases/test-cases.csv) and [detailed procedures](./test-cases/test-case-documentation.md).

## 7. Test Execution Results

TC-001 was independently verified by Codex in Chromium on October 23, 2026. The test passed in 3.7 seconds, while the complete one-test run took 6.5 seconds. Separately, the user reported an earlier successful Chromium execution of approximately 1.5 seconds on the same date. Current verified results, unique-case counts, and browser-execution counts are maintained in the [test execution summary](./test-reports/test-execution-summary.md).

No result is claimed for TC-002 through TC-006.

## 8. QA Automation Approach

Test names start with their traceable case ID. Shared configuration supplies the local base URL, separate desktop browser projects, screenshots on failure, traces retained on failure, and an HTML report. TC-001 also captures an intentional full-page PASS screenshot only after every assertion succeeds.

GitHub Actions currently validates dependency installation, Playwright configuration, and test discovery only. It does not claim remote execution results because the application under test is intentionally separate and available only through local XAMPP.

Secrets and real user credentials must never be hardcoded. Future authenticated tests should read a dedicated QA account from local environment variables or another ignored secret store.

## 9. Project Folder Structure

```text
barbershop-qa/
├── .github/workflows/playwright.yml
├── bug-reports/
│   ├── README.md
│   └── bug-report-template.md
├── screenshots/
│   └── README.md
├── test-cases/
│   ├── test-case-documentation.md
│   └── test-cases.csv
├── test-reports/
│   ├── README.md
│   └── test-execution-summary.md
├── tests/
│   └── homepage.spec.js
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```

Generated `playwright-report/` and `test-results/` folders may appear after execution and are intentionally ignored by Git.

## 10. Installation and Setup

Prerequisites:

- Node.js 20 or later
- XAMPP with Apache running
- The PHP application located at `C:\xampp\htdocs\barbershop-1`
- MySQL running for database-dependent scenarios

From PowerShell:

```powershell
cd C:\xampp\htdocs\barbershop-1\barbershop-qa
npm.cmd install
npx.cmd playwright install
```

Confirm that `http://localhost/barbershop-1/` opens before running tests. A different URL can be supplied temporarily with `BARBERSHOP_BASE_URL`.

## 11. How to Run Automated Tests

Run the portfolio's implemented test in Chromium:

```powershell
npm.cmd run test:chromium
```

Run all configured browser projects:

```powershell
npx.cmd playwright test
```

Run Chromium with a visible browser:

```powershell
npm.cmd run test:headed
```

## 12. How to View Test Reports

After a test run:

```powershell
npx.cmd playwright show-report
```

The generated HTML report is stored in `playwright-report/`. It is a local build artifact rather than maintained source documentation.

## 13. Test Evidence

Verified successful TC-001 runs save `screenshots/TC-001_Homepage_<Browser>_PASS.png` and attach it to the HTML report. Playwright stores automatic failure screenshots and retained traces in `test-results/`. Review and sanitize all evidence before publication.

## 14. Bug Reporting

Use the [bug report template](./bug-reports/bug-report-template.md) only after triage. A failed automation script may indicate a product defect, an outdated test, bad data, or an environment problem; failure alone is not proof of an application bug.

## 15. Challenges and Learning Outcomes

This portfolio emphasizes maintainable locators, HTTP and UI assertions, explicit test traceability, honest result reporting, cross-browser configuration, diagnostic evidence, and safe handling of local test data.

## 16. Future Improvements

- Automate TC-002 through TC-006 with isolated test data.
- Add reusable page objects and fixtures when the suite grows.
- Add accessibility and responsive-layout checks.
- Add authenticated appointment and order workflows using disposable QA accounts.
- Prepare CI with a reproducible PHP/MySQL test environment before enabling unattended runs.

## 17. Author

**Gian Accel V. Hernandez**

QA Automation portfolio prepared for Software QA and QA Automation internship applications.
