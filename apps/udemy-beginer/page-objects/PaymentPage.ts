import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';


export class PaymentPage extends AbstractPage{
    readonly payeeSelectBox:Locator;
    readonly payeeDetailButton:Locator;
    readonly payeeDetail: Locator;
    readonly accountSelectBox:Locator;
    readonly amountInput:Locator;
    readonly dateInput: Locator;
    readonly descriptionInput:Locator;
    readonly submitPaymentButton:Locator;
    readonly message: Locator;
    readonly onlineBankingTab: Locator;
    readonly payBillsLink: Locator;


    constructor(page:Page) {
        super(page);
        this.payeeSelectBox = page.locator("#sp_payee");
        this.payeeDetailButton = page.locator("#sp_get_payee_details");
        this.payeeDetail = page.locator('#sp_payee_details')
        this.accountSelectBox = page.locator("#sp_account");
        this.amountInput = page.locator("#sp_amount");
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator("#sp_description");
        this.submitPaymentButton = page.locator("#pay_saved_payees");
        this.message = page.locator('#alert_content > span')
        this.onlineBankingTab = page.locator('#online-banking')
        this.payBillsLink = page.locator('#pay_bills_link')

    }
    async gotoPaymentPage() {
        await this.onlineBankingTab.click();
        await this.wait(300);
        await expect(this.payBillsLink).toBeVisible();
        await this.payBillsLink.click();
    }
    async createPayment(){
        await expect(this.payeeSelectBox).toBeVisible();
        await this.payeeSelectBox.selectOption('apple');
        await this.payeeDetailButton.click();
        await expect(this.payeeDetail).toBeVisible();
        await this.accountSelectBox.selectOption('6')
        await this.amountInput.type('5000');
        await this.dateInput.type('2023-07-25')
        await this.descriptionInput.type( 'some random message')
        await this.submitPaymentButton.click();
    }

    async  assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('The payment was successfully submitted.');
     
    }


    


}