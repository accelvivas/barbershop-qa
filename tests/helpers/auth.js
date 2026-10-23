
import { expect } from '@playwright/test';

export async function loginAsTestUser(page) {

  const email = process.env.BARBERSHOP_TEST_EMAIL;
  const password = process.env.BARBERSHOP_TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('Missing test credentials');
  }

  // Open the website
  await page.goto('http://localhost/barbershop-1/');

  // Navigate to Login
  await page.getByRole('link', {
    name: /Login/i
  }).click();

  // Enter credentials
  await page.getByRole('textbox', {
    name: 'Email Address'
  }).fill(email);

  await page.getByRole('textbox', {
    name: 'Password'
  }).fill(password);

  // Submit
  await page.getByRole('textbox', {
    name: 'Password'
  }).press('Enter');

  // Verify successful authentication
  await expect(
    page.getByRole('button', {
      name: /Profile QA Test User/i
    })
  ).toBeVisible();
}
