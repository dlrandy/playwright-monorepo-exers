import { Locator, Page } from "@playwright/test";

export  class NavBar {
    readonly page:Page;
    readonly accountSummary:Locator;
    readonly accountActivity:Locator;
    readonly transferFunds:Locator;
    readonly payBills:Locator;
    readonly myMoneyMap:Locator;
    readonly onlineStatement:Locator;

    constructor(page:Page) {
        this.page = page;
        this.accountSummary = page.locator("#account_summary_link");
        this.accountActivity = page.locator("#account_activity_link");
        this.transferFunds = page.locator("#transfer_funds_link");
        this.payBills = page.locator("#pay_bills_link");
        this.myMoneyMap = page.locator("#money_map_link");
        this.onlineStatement = page.locator("#online_statements_link");
    }

    async clickOnTab(tabName:string) {
        switch (tabName) {
            case "Account Summary":
                await this.accountSummary.click()
                break;
            case "Account Activity":
                await this.accountActivity.click()
                break;
            case "Transfer Funds":
                await this.transferFunds.click()
                break;
            case "Pay Bills":
                await this.payBills.click()
                break;
            case "My Money Map":
                await this.myMoneyMap.click()
                break;
            case "Online Statements":
                await this.onlineStatement.click()
                break;
        
            default:
                throw new Error("This tab does not exist...");
                
        }
    }
};
