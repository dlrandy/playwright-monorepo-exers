import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class FeedBackPage extends AbstractPage {
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly commentInput: Locator
  readonly clearButton: Locator
  readonly submitButton: Locator
  readonly feedbackTitle: Locator


  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('#name')
    this.emailInput = page.locator('#email')
    this.subjectInput = page.locator('#subject')
    this.commentInput = page.locator('#comment')
    this.clearButton = page.locator('input[name=clear]')
    this.submitButton = page.locator('input[type=submit]')

    this.feedbackTitle = page.locator('#feedback-title')
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/')
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    comment: string,
  ) {
    await this.nameInput.type(name)
    await this.emailInput.type(email)
    await this.subjectInput.type(subject)
    await this.commentInput.type(comment)
  }

  async resetForm() {
    await this.clearButton.click()
  }
  async submitForm() {
    await this.submitButton.click()
  }

  async assertReset() {
    await expect(this.nameInput).toBeEmpty();
    await expect(this.emailInput).toBeEmpty();
    await expect(this.subjectInput).toBeEmpty();
    await expect(this.commentInput).toBeEmpty();
  }

  async feedbackFormSent(){
    await this.page.waitForURL("http://zero.webappsecurity.com/sendFeedback.html")
    await this.page.waitForSelector("#feedback-title")
    await expect(this.feedbackTitle).toBeVisible();
  }
}
