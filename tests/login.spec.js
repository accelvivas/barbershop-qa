
import { test, expect } from '@playwright/test';
import { loginAsTestUser } from './helpers/auth.js';

test('TC-002: Login with valid credentials', async ({ page }) => {

  // Get test credentials from .env
  const email = process.env.BARBERSHOP_TEST_EMAIL;
  const password = process.env.BARBERSHOP_TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('Missing test credentials');
  }

  // Step 1: Open the Barbershop website
  await page.goto('http://localhost/barbershop-1/');

  // Step 2: Navigate to Login
  await page.getByRole('link', {
    name: /Login/i
  }).click();

  // Step 3: Enter valid email
  await page.getByRole('textbox', {
    name: 'Email Address'
  }).fill(email);

  // Step 4: Enter valid password
  await page.getByRole('textbox', {
    name: 'Password'
  }).fill(password);

  // Step 5: Submit the login form
  await page.getByRole('button', {
    name: 'Login'
  }).click();

  // Step 6: Verify successful login
  await expect(
    page.getByRole('button', {
      name: /Profile QA Test User/i
    })
  ).toBeVisible();

});


test('TC-003: Login with invalid password', async ({ page }) => {

  // Use the valid dummy account email
  const email = process.env.BARBERSHOP_TEST_EMAIL;

  if (!email) {
    throw new Error('Test email is missing from .env');
  }

  // Step 1: Open the Barbershop website
  await page.goto('http://localhost/barbershop-1/');

  // Step 2: Navigate to Login
  await page.getByRole('link', {
    name: /Login/i
  }).click();

  // Step 3: Enter a valid email
  await page.getByRole('textbox', {
    name: 'Email Address'
  }).fill(email);

  // Step 4: Enter an intentionally incorrect password
  await page.getByRole('textbox', {
    name: 'Password'
  }).fill('WrongPassword123_TC003');

  // Step 5: Click Login
  await page.getByRole('button', {
    name: 'Login',
    exact: true
  }).click();


  // Step 6: Verify invalid login error message
  await expect(
    page.getByText('Invalid email or password', {
      exact: true
    })
  ).toBeVisible();


  // Step 7: Verify the authenticated profile is absent
  await expect(
    page.getByRole('button', {
      name: /Profile QA Test User/i
    })
  ).not.toBeVisible();

});



test('TC-004: Login with empty fields', async ({ page }) => {

  // Step 1: Open the website
  await page.goto('http://localhost/barbershop-1/');

  // Step 2: Navigate to Login
  await page.getByRole('link', {
    name: /Login/i
  }).click();

  // Step 3: Locate the input fields
  const email = page.getByRole('textbox', {
    name: 'Email Address'
  });

  const password = page.getByRole('textbox', {
    name: 'Password'
  });

  // Step 4: Verify both fields are empty
  await expect(email).toHaveValue('');
  await expect(password).toHaveValue('');

  // Step 5: Click Login without entering anything
  await page.getByRole('button', {
    name: 'Login',
    exact: true
  }).click();

  // Step 6: Verify the login form remains visible
  await expect(email).toBeVisible();
  await expect(password).toBeVisible();

  // Step 7: Verify authenticated profile is absent
  await expect(
    page.getByRole('button', {
      name: /Profile QA Test User/i
    })
  ).not.toBeVisible();

  
  // Inspect email field validation
  const emailValidation = await email.evaluate(input => ({
    required: input.required,
    valueMissing: input.validity.valueMissing,
    message: input.validationMessage
  }));

  console.log('Email validation:', emailValidation);

  // Inspect password field validation
  const passwordValidation = await password.evaluate(input => ({
    required: input.required,
    valueMissing: input.validity.valueMissing,
    message: input.validationMessage
  }));

  console.log('Password validation:', passwordValidation);


  // Step 8: Verify email is required
  await expect(email).toHaveAttribute('required', '');

  // Step 9: Verify password is required
  await expect(password).toHaveAttribute('required', '');

  // Step 10: Verify email validation
  const emailMissing = await email.evaluate(
    input => input.validity.valueMissing
  );

  expect(emailMissing).toBe(true);

  // Step 11: Verify password validation
  const passwordMissing = await password.evaluate(
    input => input.validity.valueMissing
  );

  expect(passwordMissing).toBe(true);

  // Step 12: Verify validation message exists
  const validationMessage = await email.evaluate(
    input => input.validationMessage
  );

  expect(validationMessage).not.toBe('');

});





  
test('TC-006: User can logout successfully', async ({ page }) => {

  // Step 1: Login using reusable helper
  await loginAsTestUser(page);

  // Step 2: Locate Profile
  const profile = page.getByRole('button', {
    name: /Profile QA Test User/i
  });

  // Step 3: Open Profile dropdown
  await profile.click();

  // Step 4: Click Logout
  await page.getByRole('link', {
    name: /Logout/i
  }).click();

  // Step 5: Verify Login link appears
  await expect(
    page.getByRole('link', {
      name: /Login/i
    })
  ).toBeVisible();

  // Step 6: Verify Profile disappears
  await expect(profile).not.toBeVisible();

  // Step 7: Attempt to access protected Shop
  await page.getByRole('link', {
    name: 'Shop',
    exact: true
  }).click();

  // Step 8: Verify redirection to Login
  await expect(page).toHaveURL(/login\.php/);

  // Step 9: Verify login form appears
  await expect(
    page.getByRole('textbox', {
      name: 'Email Address'
    })
  ).toBeVisible();

});



