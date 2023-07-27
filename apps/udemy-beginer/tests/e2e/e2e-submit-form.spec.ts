import { test, expect } from '@playwright/test';

test.describe("Feedback form", ()=>{
    test.beforeEach(async({page})=>{
        await page.goto("http://zero.webappsecurity.com/index.html");
        await page.click("#feedback");
    });
    // reset feedback form
    test('reset feedback form', async({page}) => {
        await page.type("#name", "some name");
        await page.type("#email", "some email");
        await page.type("#subject", "some subject");
        await page.type("#comment", "some nice comment");
        await page.click("input[name=clear]");
        const nameInput = await page.locator("#name");
        const emailInput = await page.locator("#email");
        const subjectInput = await page.locator("#subject");
        const commentInput = await page.locator("#comment");
       await expect(nameInput).toBeEmpty();
       await expect(emailInput).toBeEmpty();
       await expect(subjectInput).toBeEmpty();
       await expect(commentInput).toBeEmpty();
    });
    // submit feedback form
    test("Submit feedback form",async({page}) => {
        await page.type("#name", "some name");
        await page.type("#email", "some email@email.com");
        await page.type("#subject", "some subject");
        await page.type("#comment", "some nice comment");
        await page.click("input[type=submit]");
        await page.waitForURL("http://zero.webappsecurity.com/sendFeedback.html")
        await page.waitForSelector("#feedback-title")
    });
});











