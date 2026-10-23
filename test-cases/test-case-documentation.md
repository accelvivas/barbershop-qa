# Test Case Procedures

This document complements [`test-cases.csv`](./test-cases.csv). It reflects behavior inspected in the PHP application on October 23, 2026. Only TC-001 is currently automated. Credentials must be provided through secure local test data and must never be committed.

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

- Type: Planned functional test
- Preconditions: Apache and MySQL are running; a dedicated regular QA account exists; the browser is logged out.
- Procedure:
  1. Open `login.php`.
  2. Enter the QA account email in `Email Address`.
  3. Enter the QA account password in `Password`.
  4. Select `Login`.
  5. Verify the user is authenticated and reaches `index.php`, unless the application has stored another intended destination.
  6. Verify authenticated profile controls are displayed.
- Expected: Authentication succeeds for the valid account without exposing credentials in logs, screenshots, or source control.

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

## TC-006 — Learn Our Story Button Functionality

- Type: Planned navigation test
- Preconditions: The public homepage is available.
- Procedure:
  1. Open the homepage.
  2. Locate `Learn Our Story`.
  3. Select the link.
  4. Verify navigation to the configured `about.php` destination.
  5. Verify a successful HTTP response and visible destination content.
- Expected: The configured destination loads successfully.
- Note: The source was inspected, but this test has not been run. A source-level concern must not be reported as an application defect until execution reproduces it and the expected behavior is confirmed.
