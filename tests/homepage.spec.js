
import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

test('TC-001 | Homepage loading', async ({ page }, testInfo) => {
  const response = await page.goto('./');

  expect(response).not.toBeNull();
  expect(response.ok()).toBeTruthy();

  await expect(page.locator('body')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Login', exact: true })).toBeVisible();

  // Capture portfolio evidence only after every assertion has passed.
  const folder = path.join(process.cwd(), 'screenshots');
  mkdirSync(folder, { recursive: true });

  const browserName =
    testInfo.project.name.charAt(0).toUpperCase() + testInfo.project.name.slice(1);
  const screenshotPath = path.join(
    folder,
    `TC-001_Homepage_${browserName}_PASS.png`
  );

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  await testInfo.attach('TC-001 Homepage Evidence', {
    path: screenshotPath,
    contentType: 'image/png',
  });
});
