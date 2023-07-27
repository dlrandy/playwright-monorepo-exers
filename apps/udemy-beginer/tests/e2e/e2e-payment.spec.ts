import { test, expect } from '@playwright/test'

test.describe('New Payments', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
    await page.goto('http://zero.webappsecurity.com/')
  })
  test('Should send new payment', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#online-banking');
    await page.waitForSelector('#pay_bills_link');
    await page.click('#pay_bills_link');
    await page.waitForSelector('#sp_payee')
    await page.selectOption('#sp_payee', 'apple')
    await page.click('#sp_get_payee_details')
    await page.waitForSelector('#sp_payee_details');
    await page.selectOption('#sp_account', '6')
    await page.type('#sp_amount', '5000')
    await page.type('#sp_date', '2023-07-25')
    await page.type('#sp_description', 'some random message')
    await page.click('#pay_saved_payees')

    const message = await page.locator('#alert_content > span')
    await expect(message).toBeVisible()
    await expect(message).toContainText('The payment was successfully submitted.');
  })
})
