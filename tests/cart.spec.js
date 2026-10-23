
import { test, expect } from '@playwright/test';
import { loginAsTestUser } from './helpers/auth.js';

test('TC-005: Add product to shopping cart', async ({ page }) => {

  // Step 1: Login
  await loginAsTestUser(page);

  // Step 2: Navigate to Shop
  await page.getByRole('link', {
    name: 'Shop',
    exact: true
  }).click();

  // Step 3: Locate Premium Pomade product
  const productCard = page.locator('.product-card').filter({
    has: page.locator('img[alt="Premium Pomade"]')
  });

  // Step 4: Verify product exists
  await expect(productCard).toHaveCount(1);
  await expect(productCard).toBeVisible();

  // Step 5: Verify price metadata
  await expect(productCard).toHaveAttribute(
    'data-price',
    '22.00'
  );

  // Step 6: Add Premium Pomade to Cart
  await productCard.getByRole('button', {
    name: /Add to Cart/i
  }).click();

  // Step 7: Verify checkout button
  const checkoutButton = page.getByRole('button', {
    name: 'Checkout Now'
  });

  await expect(checkoutButton).toBeVisible();

  // Step 8: Open checkout
  await checkoutButton.click();

  // Step 9: Locate Premium Pomade in checkout
  const cartItem = page.locator('#items-container .order-item')
    .filter({
      has: page.getByRole('heading', {
        name: 'Premium Pomade',
        exact: true
      })
    });

  // Step 10: Verify one matching checkout item
  await expect(cartItem).toHaveCount(1);

  // Step 11: Verify product name
  await expect(
    cartItem.locator('.item-info h4')
  ).toHaveText('Premium Pomade');

  // Step 12: Verify product subtotal
  await expect(
    cartItem.locator('.item-subtotal')
  ).toHaveText('$22.00');

  
  // Step 13: Locate the quantity input
  const quantity = cartItem.locator('.qty-input');

  // Step 14: Verify quantity is 1
  await expect(quantity).toHaveValue('1');

  // Step 15: Verify minimum quantity
  await expect(quantity).toHaveAttribute('min', '1');

  // Step 16: Verify unit price
  await expect(
    cartItem.locator('.item-price')
  ).toContainText('$22.00');

});


test('TC-007: Shopping cart quantity adjustment', async ({ page }) => {

  // Step 1: Login
  await loginAsTestUser(page);

  // Step 2: Open Shop
  await page.getByRole('link', {
    name: 'Shop',
    exact: true
  }).click();

  // Step 3: Locate Premium Pomade
  const productCard = page.locator('.product-card').filter({
    has: page.locator('img[alt="Premium Pomade"]')
  });

  // Step 4: Add Premium Pomade
  await productCard.getByRole('button', {
    name: /Add to Cart/i
  }).click();

  // Step 5: Open checkout
  await page.getByRole('button', {
    name: 'Checkout Now'
  }).click();

  // Step 6: Locate the selected cart item
  const cartItem = page.locator('.order-item').filter({
    has: page.getByRole('heading', {
      name: 'Premium Pomade',
      exact: true
    })
  });

  const quantity = cartItem.locator('.qty-input');
  const subtotal = cartItem.locator('.item-subtotal');

  // Step 7: Verify initial quantity
  await expect(quantity).toHaveValue('1');
  await expect(subtotal).toHaveText('$22.00');

  // Step 8: Increase quantity
  await cartItem.locator('.increase-qty').click();

  // Step 9: Verify quantity and subtotal
  await expect(quantity).toHaveValue('2');
  await expect(subtotal).toHaveText('$44.00');

  // Step 10: Decrease quantity
  await cartItem.locator('.decrease-qty').click();

  // Step 11: Verify original values
  await expect(quantity).toHaveValue('1');
  await expect(subtotal).toHaveText('$22.00');

});


test('TC-008: Remove product from shopping cart', async ({ page }) => {

  // Step 1: Login with the dedicated QA account
  await loginAsTestUser(page);

  // Step 2: Open the authenticated Shop page
  await page.getByRole('banner').getByRole('link', {
    name: 'Shop',
    exact: true
  }).click();

  // Step 3: Locate Premium Pomade and add it to the cart
  const productCard = page.locator('.product-card').filter({
    has: page.locator('img[alt="Premium Pomade"]')
  });

  await expect(productCard).toHaveCount(1);
  await productCard.getByRole('button', {
    name: /Add to Cart/i
  }).click();

  // Step 4: Open the checkout/cart page
  await page.getByRole('button', {
    name: 'Checkout Now'
  }).click();

  // Step 5: Verify the selected product is present before removal
  const cartItem = page.locator('#items-container .order-item').filter({
    has: page.getByRole('heading', {
      name: 'Premium Pomade',
      exact: true
    })
  });

  await expect(cartItem).toHaveCount(1);
  await expect(cartItem).toBeVisible();

  // Step 6: Start the remove flow and verify its confirmation prompt
  await cartItem.locator('button.remove-item').click();
  await expect(page.getByText(
    'Are you sure you want to remove this item?',
    { exact: true }
  )).toBeVisible();

  // Step 7: Confirm removal and validate the server response
  const removeResponsePromise = page.waitForResponse(response =>
    response.url().endsWith('/update_cart.php') &&
    response.request().method() === 'POST' &&
    response.request().postData()?.includes('action=remove')
  );

  await page.getByRole('button', {
    name: 'YES',
    exact: true
  }).click();

  const removeResponse = await removeResponsePromise;
  expect(removeResponse.ok()).toBeTruthy();

  const removeResult = await removeResponse.json();
  expect(removeResult.success).toBe(true);
  expect(removeResult.itemsCount).toBe(0);

  // Step 8: Verify the product is removed and the cart is empty
  await expect(cartItem).toHaveCount(0);
  await expect(page.locator('#items-container .empty-cart-message')).toContainText(
    'Your cart is empty'
  );

  // Step 9: Reload to verify removal persisted in the PHP session
  await page.reload();
  await expect(page.getByRole('heading', {
    name: 'Premium Pomade',
    exact: true
  })).toHaveCount(0);
  await expect(page.locator('#items-container .empty-cart-message')).toContainText(
    'Your cart is empty'
  );

});


test('TC-009: Product category filtering', async ({ page }) => {

  // Step 1: Login with the dedicated QA account
  await loginAsTestUser(page);

  // Step 2: Open the authenticated Shop page
  await page.getByRole('banner').getByRole('link', {
    name: 'Shop',
    exact: true
  }).click();

  const allProductCards = page.locator('.shop-grid .product-card');
  const hairCareCards = page.locator(
    '.shop-grid .product-card[data-category="hair"]'
  );
  const nonHairCareCards = page.locator(
    '.shop-grid .product-card:not([data-category="hair"])'
  );

  // Step 3: Verify the test data contains matching and nonmatching products
  const totalProductCount = await allProductCards.count();
  const hairCareProductCount = await hairCareCards.count();
  const nonHairCareProductCount = await nonHairCareCards.count();

  expect(totalProductCount).toBeGreaterThan(0);
  expect(hairCareProductCount).toBeGreaterThan(0);
  expect(nonHairCareProductCount).toBeGreaterThan(0);

  // Step 4: Select the Hair Care category
  const hairCareFilter = page.getByRole('button', {
    name: 'Hair Care',
    exact: true
  });

  await hairCareFilter.click();
  await expect(hairCareFilter).toHaveClass(/active/);

  // Step 5: Verify the product count reflects the selected category
  await expect(page.locator('.product-count')).toHaveText(
    `Showing ${hairCareProductCount} of ${totalProductCount} products`
  );

  // Step 6: Verify matching products remain visible
  for (let index = 0; index < hairCareProductCount; index += 1) {
    await expect(hairCareCards.nth(index)).toBeVisible();
  }

  // Step 7: Verify products from other categories are hidden
  for (let index = 0; index < nonHairCareProductCount; index += 1) {
    await expect(nonHairCareCards.nth(index)).toBeHidden();
  }

  // Step 8: Restore All Products and verify every card is visible again
  const allProductsFilter = page.getByRole('button', {
    name: 'All Products',
    exact: true
  });

  await allProductsFilter.click();
  await expect(allProductsFilter).toHaveClass(/active/);
  await expect(page.locator('.product-count')).toHaveText(
    `Showing ${totalProductCount} of ${totalProductCount} products`
  );

  for (let index = 0; index < totalProductCount; index += 1) {
    await expect(allProductCards.nth(index)).toBeVisible();
  }

});



