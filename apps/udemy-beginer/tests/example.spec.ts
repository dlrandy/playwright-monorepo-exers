import { test, expect } from '@playwright/test'
import { assertTitle, loadHomePage } from './helpers';
test('Simple basic test', async ({ page }) => {
  await page.goto('https://example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toHaveText('Example Domain')
})

test('Clicking on elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')
  await page.click('#signin_button')
  await page.click('text=Sign in')
  const errorMessage = await page.locator('.alert-error')
  // await expect(errorMessage).toEqual("Login and/or password are wrong.")
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
  await expect(errorMessage).toHaveText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({ page }) => {
  //text
  await page.click('text=some text')

  // css selectors
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  // only visible css selector
  await page.click('.submit:visible')

  // combinations
  await page.click('#username .first')
  // xpath
  await page.click('//button')
})
test.describe('My first test suite', () => {
  // test.only('working with inputs', async ({ page }) => {
  test('working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')

    await page.type('#user_login', 'some username')
    await page.type('#user_password', 'some password')
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  // npx playwright test --grep @myTag
  //   npm run test -w=@playwright-monorepo/udemy-beginer -- --grep myTag
  test('assertions @myTag', async ({ page }) => {
    await page.goto('https://example.com')
    await expect(page).toHaveURL('https://example.com')
    await expect(page).toHaveTitle('Example Domain')
    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)
    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()

    // await expect(element)
  })
})

test.describe.parallel.only('hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com')
  })
//   test.afterAll
  test('screenshots', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })
  test('single element screenshots', async ({ page }) => {
    const element = await page.$('h1')
    await element?.screenshot({ path: 'single_element_screenshot.png' })
  })
})

test("customer helpers", async({page})=>{
    await loadHomePage(page);
    // await page.pause();
    await assertTitle(page);
});


