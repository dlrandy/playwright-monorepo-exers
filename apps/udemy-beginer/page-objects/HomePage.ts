import { Locator, Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
export class HomePage extends AbstractPage {
    readonly signInButton:Locator;
    readonly searchBox:Locator;
    readonly feedbackButton: Locator;


    constructor(page:Page) {
        super(page);
        this.signInButton = page.locator("#signin_button");
        this.searchBox = page.locator("#searchTerm");
        this.feedbackButton = page.locator('#feedback')

    }

    async visit(){
        await this.page.goto("http://zero.webappsecurity.com/");
    }

    async clickOnSignIn(){
        await this.signInButton.click();
    }
    

    
    async clickOnFeedbackLink(){
        await this.feedbackButton.click();
      }
    async searchFor(phrase:string){
        await this.searchBox.type(phrase);
        await this.page.keyboard.press('Enter')
    }
}