import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
test.describe.parallel("Login/Logout Flow", ()=>{
    let loginPage:LoginPage;
    let homePage:HomePage;
    // Before hook
    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await homePage.visit();
    });
    // Negative scenario
    test('Negative Scenario for Login', async({page}) => {
        await homePage.clickOnSignIn();
        await loginPage.login("invalid username","invalid password");
        await loginPage.assertErrorMessage();

    });
    // Positive scenario + logout
    test('Positive Scenario for login+logout', async({page}) => {
        await homePage.clickOnSignIn();
        await loginPage.login("username","password");
        await homePage.visit();
        const carousel = await page.locator('#carousel');
        await expect(carousel).toBeVisible();
        await page.goto('http://zero.webappsecurity.com/logout.html');
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    });
});


