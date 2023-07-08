import { test, expect } from '@playwright/test';
import { ToDoPage } from './TodoPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

test('should allow me to add todo items', async ({ page }) => {
  // Create a todo
  await page.locator('.new-todo').fill('buy some cheese');
  await page.locator('.new-todo').press('Enter');

  // Make sure the list has the todo item
  await expect(page.locator('.view label')).toHaveText([
    'buy some cheese'
  ]);
});
test('should allow me to add todo items with page model object', async ({ page }) => {
  const todoPage = new ToDoPage(page);
  await todoPage.addTodo('buy some cheese');

  await todoPage.expectTodos(['buy some cheese']);
  await todoPage.addTodo('feed the cat');
  await todoPage.expectTodos([
    'buy some cheese',
    'feed the cat'
  ]);
});

test('selectors', async ({page})=>{
  /* Css Selectors */
  await page.locator('input.new-todo').click();
  /* Explicit Css Selectors */
  await page.locator('css=input.new-todo').click();
  /* Text Selectors */
  // await page.locator('text=submit').click();
  /* Chain Selectors */
  // await page.locator('button >> text-submit').click();
  /* Nth Selectors */
  await page.locator('input >> nth=0').click();
  /* data-set Selectors */
  // await page.locator('data-test=submit').click();
});
