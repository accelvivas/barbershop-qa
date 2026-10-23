# Tipuno Barbershop — QA Automation Testing

**Playwright + JavaScript | Functional & Regression Testing | QA Portfolio Project**

📄 **[View the Complete QA Automation Test Report (PDF)](test-reports/Barbershop_QA_Automation_Test_Report_.pdf)**

This repository contains my automated test scripts and quality assurance documentation for **Tipuno Barbershop**, a PHP-based web application. I used **Playwright** to validate important customer workflows, investigate test failures, and run a repeatable regression suite against the application on **localhost (XAMPP)**.

The original Barbershop website is a separate application. This repository focuses on **testing**, not on hosting or redistributing its PHP source code.

## Test Execution Results

| Metric | Result |
|---|---|
| Test cases executed | **12** |
| Passed | **12** |
| Failed | **0** |
| Skipped / Flaky | **0 / 0** |
| Pass rate | **100%** |
| Complete regression duration | **52.6 seconds** |
| Browser | **Chromium** |
| Environment | **Windows, localhost, XAMPP** |
| Execution date | **October 23, 2026** |

> **Scope:** These results apply to the 12 executed Chromium test cases in the local test environment. They do not establish that the entire application is defect-free. Individual durations in the report were captured in separate executions and do not add up to the full regression duration.

## Application and Testing Scope

The Barbershop website provides customer login, product browsing, shopping cart actions, and appointment management. The tests cover both positive and negative scenarios, including required-field validation and persistence-related UI checks.

| ID | Module | Automated test | Result |
|---|---|---|---|
| TC-001 | Homepage | Homepage loading | PASS |
| TC-002 | Authentication | Login with valid credentials | PASS |
| TC-003 | Authentication | Login with invalid password | PASS |
| TC-004 | Authentication | Login with empty fields | PASS |
| TC-005 | Shopping Cart | Add product to shopping cart | PASS |
| TC-006 | Authentication | Logout and protected Shop access | PASS |
| TC-007 | Shopping Cart | Shopping cart quantity adjustment | PASS |
| TC-008 | Shopping Cart | Remove product from shopping cart | PASS |
| TC-009 | Product Filtering | Product category filtering | PASS |
| TC-010 | Appointment Booking | Appointment booking form validation | PASS |
| TC-011 | Appointment Booking | Successful appointment booking | PASS* |
| TC-012 | Appointment Management | Appointment cancellation | PASS |

**TC-011 clarification:** The Playwright run passed its implemented checks, including the confirmation interface, booking-reference format, and presence of a unique test marker on **My Appointments**. An independent record-specific/database persistence check remains a recommended improvement.

## Tools and Techniques

- **Playwright Test + JavaScript** — browser automation, assertions, and regression execution
- **Playwright Codegen** — exploring workflows and discovering candidate locators
- **Playwright HTML Reporter / Trace Viewer** — reviewing execution results and debugging failures
- **VS Code** — writing and maintaining test scripts
- **XAMPP (Apache / MySQL) + PHP** — local application test environment
- **Environment variables** — supplying credentials for a dedicated dummy QA account

Techniques practiced include scoped locators, positive and negative testing, native form-validation checks, reusable login helpers, state-change assertions, and checking cart or appointment status after navigation or reload.

## Repository Organization

The testing project is organized around these files and folders:

```text
barbershop-qa/
├── tests/
│   ├── helpers/
│   │   └── auth.js
│   ├── homepage.spec.js
│   ├── login.spec.js
│   ├── cart.spec.js
│   └── appointment.spec.js
├── test-cases/                  # Test case documentation (if included)
├── test-reports/                # Curated portfolio reports (if included)
├── screenshots/                 # Sanitized evidence (if included)
├── playwright.config.js
├── package.json
├── .gitignore
└── README.md
```

> Some documentation/evidence folders are optional. Keep only folders and links that you actually publish in your repository.

## Local Setup

**Prerequisites:** Node.js and npm, the Barbershop PHP application running locally, XAMPP with its required services, and a dedicated dummy test account. The QA repository alone does **not** start the PHP application.

1. Start Apache and MySQL in XAMPP, and confirm the website opens at `http://localhost/barbershop-1/`.
2. Open this automation repository in VS Code.
3. Install dependencies and the Chromium browser:

   ```powershell
   npm.cmd install
   npx.cmd playwright install chromium
   ```

4. Create a local `.env` file in the QA project root (do not commit it):

   ```dotenv
   BARBERSHOP_TEST_EMAIL=your-dummy-test-email@example.com
   BARBERSHOP_TEST_PASSWORD=your-dummy-test-password
   ```

5. Make sure the dummy account and test data are available. Appointment tests may create or cancel records; use a **separate QA database** rather than real customer data.

## Run Automated Tests

Run the full Chromium regression suite, sequentially:

```powershell
npx.cmd playwright test --project=chromium --workers=1
```

Run one test case:

```powershell
npx.cmd playwright test tests/cart.spec.js --grep "TC-005" --project=chromium --headed
```

Run authentication tests:

```powershell
npx.cmd playwright test tests/login.spec.js --project=chromium
```

Open the Playwright HTML report (when generated by the configured reporter):

```powershell
npx.cmd playwright show-report
```

For troubleshooting, inspect the failing assertion, screenshot, error context, and Playwright trace. **Do not confuse a failed locator/assertion with a confirmed application defect** until its cause is investigated.

## Test Report and Evidence

The full portfolio report documents each test case's objective, preconditions, steps, expected versus actual results, and curated execution evidence.

For public sharing, keep only sanitized screenshots and summary reports. Do **not** commit `.env`, real credentials, unsanitized Playwright HTML reports, traces, or customer data; recorded browser actions may expose input values.

## Findings and Future Improvements

The executed Chromium suite completed with **12 passes and no reported failures**. Planned improvements are:

1. **Strengthen TC-011:** Locate the exact created appointment record and verify service, schedule, owner, and status; check database persistence when authorized.
2. **Isolate test data:** Reset the cart and clean up dummy bookings safely so repeated runs remain independent.
3. **Expand browser coverage:** Execute and document Firefox and WebKit results separately.
4. **Add CI testing:** Run safe, non-destructive tests in GitHub Actions after preparing a reproducible test environment.
5. **Extend test coverage:** Add boundary cases, unavailable booking slots, duplicate bookings, and session-expiration checks.
6. **Improve maintainability:** Introduce Page Object Model where repetition justifies it and standardize evidence collection.

## Author

**Gian Accel V. Hernandez**  
QA Automation Portfolio Project | Software QA Internship Preparation

---

*This project showcases hands-on learning in software QA and Playwright automation. The Barbershop website was tested in a local environment and is not publicly hosted through this repository.*
