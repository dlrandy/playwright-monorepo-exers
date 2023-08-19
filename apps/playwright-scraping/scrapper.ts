const playwright = require('playwright');
const random_useragent = require("random-useragent")
const fs = require('fs')
const BASE_URL = "https://github.com/topics/playwright"


;(async () => {
    const userAgent = random_useragent.getRandom()
    const browser = await playwright.chromium.launch({headless: true});
    const context = await browser.newContext({userAgent})
    const page = await context.newPage({bypassCSP: true})
    await page.setDefaultTimeout(30000)
    await page.setViewportSize({ width: 800, height: 600})
    await page.goto(BASE_URL);


    const repositories = await page.$$eval("article.border", repoCards =>{
        return repoCards.map((card)=>{
            const [user, repo] = card.querySelectorAll('h3 a')
            const formatText = element => element?.innerText.trim();

            return {
                user:formatText(user),
                repo: formatText(repo),
                url: repo.href,
            }


        })

    })
    const logger = fs.createWriteStream("data.txt", {flag: 'w'})
    logger.write(JSON.stringify(repositories, null,2));
    // important
    await browser.close()

})().catch(error => {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
    process.exit(1)
})
