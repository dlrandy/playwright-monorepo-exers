import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage'

test.describe('New Payments', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page);
    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await homePage.visit()
  })
  test('Should send new payment', async ({ page }) => {
    await paymentPage.gotoPaymentPage()
    await paymentPage.createPayment();
   await paymentPage.assertSuccessMessage();
  })
})
