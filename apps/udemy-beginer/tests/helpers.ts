export const loadHomePage = async (page) => {
  await page.goto('https://www.example.com')
}


export const assertTitle = async (page) => {
    await page.waitForSelector('h1');
};



