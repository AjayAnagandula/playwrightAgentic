import { test, expect, type Page } from '@playwright/test';

const credentials = {
  username: 'standard_user',
  password: 'secret_sauce',
};

async function login(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByLabel('Username').fill(credentials.username);
  await page.getByLabel('Password').fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

async function addBackpackAndOpenCart(page: Page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);
}

test.describe('SCRUM-101 checkout process', () => {
  test('AC1: reviews cart items and navigation controls', async ({ page }) => {
    await login(page);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();
    await expect(page.getByText('$9.99')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  });

  test('AC1: displays a cart total calculation', async ({ page }) => {
    test.fail(true, 'Known product gap DEF-SCRUM-101-002: cart page has no total calculation.');
    await login(page);
    await addBackpackAndOpenCart(page);
    await expect(page.getByText(/Total/)).toBeVisible();
  });

  test('AC2: shows required validation for an empty checkout form', async ({ page }) => {
    await login(page);
    await addBackpackAndOpenCart(page);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByRole('alert')).toContainText('First Name is required');
  });

  test('AC2 and AC3: submits valid information and verifies order overview', async ({ page }) => {
    await login(page);
    await addBackpackAndOpenCart(page);
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByLabel('First Name').fill('Jane');
    await page.getByLabel('Last Name').fill('Tester');
    await page.getByLabel('Zip/Postal Code').fill('560001');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await expect(page.getByText('Tax: $2.40')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();
  });

  test('AC4: completes the order and clears the cart', async ({ page }) => {
    await login(page);
    await addBackpackAndOpenCart(page);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByLabel('First Name').fill('Jane');
    await page.getByLabel('Last Name').fill('Tester');
    await page.getByLabel('Zip/Postal Code').fill('560001');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Cart, empty/ })).toBeVisible();
  });

  test('AC5: rejects invalid checkout data', async ({ page }) => {
    test.fail(true, 'Known product gap DEF-SCRUM-101-001: invalid values are accepted.');
    await login(page);
    await addBackpackAndOpenCart(page);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByLabel('First Name').fill('@@@');
    await page.getByLabel('Last Name').fill('###');
    await page.getByLabel('Zip/Postal Code').fill('abc');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByRole('alert')).toBeVisible();
  });
});
