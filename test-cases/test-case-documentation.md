# Test Case Procedures

This document complements [`test-cases.csv`](./test-cases.csv). It reflects behavior inspected in the PHP application on October 23, 2026. TC-001 and TC-002 are automated. Credentials must be provided through secure local test data and must never be committed.

## TC-001 — Homepage Loading

- Type: Automated smoke test
- Preconditions: Apache is running, `http://localhost/barbershop-1/` is reachable, and no authenticated session is active.
- Procedure:
  1. Navigate to the application root.
  2. Assert that the navigation response exists and is successful.
  3. Assert that the document body is visible.
  4. Assert that the `Login` link is visible.
  5. After all assertions pass, save and attach a full-page screenshot.
- Expected: All assertions pass and verified evidence is written to `screenshots/TC-001_Homepage_<Browser>_PASS.png`.
- Automation: [`tests/homepage.spec.js`](../tests/homepage.spec.js)

## TC-002 — Login Using Valid Credentials

- Type: Automated functional test
- Automation: [`tests/login.spec.js`](../tests/login.spec.js)
- Execution status: PASS on October 23, 2026
- Browser and duration: Chromium, 4.7-second test; 5.5-second overall run
- Preconditions: Apache and MySQL are running; a dedicated regular QA account exists; the browser is logged out.
- Procedure:
  1. Open the homepage.
  2. Select the `Login` link and verify navigation to `login.php`.
  3. Enter the environment-provided email in `Email Address`.
  4. Enter the environment-provided password in `Password`.
  5. Select `Login`.
  6. Verify navigation to `index.php`.
  7. Verify the authenticated profile control is visible and the public `Login` link is absent.
  8. Open the profile control and verify the `Logout` action.
  9. Mask account identity fields, capture the PASS screenshot, and attach it to the HTML report.
- Test data: `BARBERSHOP_TEST_EMAIL` and `BARBERSHOP_TEST_PASSWORD` from the ignored local `.env`; the password is omitted from documentation and evidence.
- Expected: Authentication succeeds, the authenticated account interface appears, and `screenshots/TC-002_Valid_Login_chromium_PASS.png` is created only after all assertions pass.
- Actual: All assertions passed. The browser reached `index.php`, displayed the authenticated profile control and Logout action, and removed the public Login link.
- Evidence: `screenshots/TC-002_Valid_Login_chromium_PASS.png` and the generated Playwright HTML report. Account identity fields are masked in the screenshot.
- Remarks: A dedicated dummy QA account was created after explicit approval. Its password remains only in the ignored local `.env` file.

## TC-003 — Login Using Invalid Credentials

- Type: Planned negative test
- Preconditions: Apache and MySQL are running and the browser is logged out.
- Procedure:
  1. Open `login.php`.
  2. Enter a syntactically valid, controlled email that is not registered.
  3. Enter an incorrect runtime-only password.
  4. Select `Login`.
  5. Verify that the user remains on the login page.
  6. Verify that `Invalid email or password` is displayed.
- Expected: Access is denied without revealing whether the email or password was incorrect.

## TC-004 — Login With Empty Required Fields

- Type: Planned validation test
- Preconditions: The application is available and the browser is logged out.
- Procedure:
  1. Open `login.php`.
  2. Leave `Email Address` and `Password` blank.
  3. Select `Login`.
  4. Verify form submission is prevented.
  5. Verify `Email address is required` for the email field.
  6. Verify `Password is required` for the password field.
- Expected: Both required-field messages are visible and no authentication request is completed.

## TC-005 — Shopping Cart Functionality

- Type: Planned functional test
- Preconditions: The homepage is available and browser local storage has been cleared for test isolation.
- Procedure:
  1. Open the homepage.
  2. Locate the `Premium Pomade` product card.
  3. Select its `Add to Cart` button.
  4. Verify the confirmation `Premium Pomade added to your cart` appears.
  5. Verify local storage contains product ID `1`, price `15`, and quantity `1`.
- Expected: The selected product is stored once with quantity 1 and the confirmation is shown.
- Boundary: Checkout, payment, database persistence, and authenticated-session synchronization are outside this initial case.

## TC-006 — Logout Functionality

- Type: Planned authentication test
- Preconditions: Apache and MySQL are running; the application database is available; a dedicated regular QA account exists; and the user is authenticated.
- Procedure:
  1. Log in using the dedicated QA account from the ignored local `.env` file.
  2. Verify the authenticated profile control is visible.
  3. Open the profile menu.
  4. Select `Logout`.
  5. Wait for the logout transition to redirect to `index.php`.
  6. Verify the public `Login` link is visible.
  7. Verify the authenticated profile control is absent.
- Test data: `BARBERSHOP_TEST_EMAIL` and `BARBERSHOP_TEST_PASSWORD` from the ignored local `.env`; never expose the password in source control or evidence.
- Expected: The PHP session is destroyed, the browser returns to `index.php`, and only the unauthenticated navigation is available.
- Status: NOT RUN. This case is documented but has not yet been automated or executed.
