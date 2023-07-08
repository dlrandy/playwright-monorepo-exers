import playwright from "playwright";

async function main() {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  /** carry out actions */
  await page.goto("https://google.com");
  await page.locator("[type=Search]").fill("Microsoft Playwright");
  await page.locator("[type=Search]").press("Enter");
  await page.locator("#result-stats").waitFor({ state: "visible" });
  await new Promise((res) => setTimeout(res, 5000));
  await browser.close();
}

main();
