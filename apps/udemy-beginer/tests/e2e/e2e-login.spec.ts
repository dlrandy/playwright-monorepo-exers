import { test, expect } from '@playwright/test';

test.describe.parallel("Login/Logout Flow", ()=>{

    // Before hook
    test.beforeEach(async({page})=>{
        await page.goto('http://zero.webappsecurity.com/');
    });
    // Negative scenario
    test('Negative Scenario for Login', async({page}) => {
        await page.click('#signin_button');
        await page.type('#user_login','invalid username');
        await page.type('#user_password','invalid password');
        await page.click('text=Sign in');
        const errorMsg = await page.locator('.alert-error');
        await expect(errorMsg).toContainText('Login and/or password are wrong.');

    });
    // Positive scenario + logout
    test('Positive Scenario for login+logout', async({page}) => {
        await page.click('#signin_button');
        await page.type('#user_login','username');
        await page.type('#user_password','password');
        await page.click('text=Sign in');
        await page.goto('http://zero.webappsecurity.com/');
        const carousel = await page.locator('#carousel');
        await expect(carousel).toBeVisible();
        await page.goto('http://zero.webappsecurity.com/logout.html');
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    });
});


