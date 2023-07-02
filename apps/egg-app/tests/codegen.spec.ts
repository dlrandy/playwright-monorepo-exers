import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('dd');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.locator('html').click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.locator('html').click();
  await page.locator('html').click();
  await page.getByText('All Active Completed').click();
  await page.getByPlaceholder('What needs to be done?').click();
  await page.locator('html').click();
});