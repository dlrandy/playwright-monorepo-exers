import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { FeedBackPage } from '../../page-objects/FeedBackPage';

test.describe("Feedback form", ()=>{
    let homePage: HomePage;
    let feedbackPage: FeedBackPage;
    test.beforeEach(async({page})=>{
        homePage = new HomePage(page);
        feedbackPage = new FeedBackPage(page);

       await homePage.visit();
       await homePage.clickOnFeedbackLink();
    });
    // reset feedback form
    test('reset feedback form', async({page}) => {
        await feedbackPage.fillForm("some name", "email","subject","comment");
        await feedbackPage.resetForm();
       await feedbackPage.assertReset();
    });
    // submit feedback form
    test("Submit feedback form",async({page}) => {
        await feedbackPage.fillForm("some name", "some email@email.com", "some subject", "some nice comment");
        await feedbackPage.submitForm();
        await feedbackPage.feedbackFormSent();
    });
});











