const puppeteer = require('puppeteer');

const priceLimit = 5

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    // console.log(browser)
    const page = await browser.newPage();
    // console.log(page)
    await page.goto(url);
    console.log('gone to')

    // const [el] = await page.$x('//*[@id="itemTitle"]');
    // const txt = await el.getProperty('textContent');
    // const srcTxt = await txt.jsonValue();

    // const [price] = await page.$x('//*[@id="srp-river-results"]/ul/li[1]/div/div[2]/div[2]/div[1]/span');
    // const [list] = await page.$x('//*[@id="srp-river-results"]/ul');
    // console.log(list);

    // const [item] = await page.$x('//*[@id="srp-river-results"]/ul/li[1]')
    // console.log(item)

    let imagesOfItems = []

    let imageAndTime = []


    for (let i = 1; i < 5; i++) {

        const [item1img] = await page.$x(`//*[@id="srp-river-results"]/ul/li[${i}]/div/div[1]/div/a/div/img`);
        const src = await item1img.getProperty('src');
        const srcTxt = await src.jsonValue();

        const [itemTime] = await page.$x(`//*[@id="s0-14-11-6-3-listing${i}-item-9-1-23[1[1[0]]]-2-0"]/span[2]`)
        const time = await itemTime.getProperty('textContent');
        // console.log(price)
        const textContent = await time.jsonValue();


        // console.log(textContent.includes('h'));

        if (!textContent.includes('h')) {

            console.log(textContent);

            imageAndTime.push({
                imgSrc: srcTxt,
                timeLeft: textContent
                }
            )
        }
    }

    
    console.log(imageAndTime);
    // console.log({srcTxt});
    
    browser.close();
}



scrapeProduct(`https://www.ebay.co.uk/sch/i.html?_sacat=0&_sop=1&_nkw=adidas%20trainers%20size%209&_frs=1&_udhi=${priceLimit}&rt=nc`)
// scrapeProduct('https://www.ebay.co.uk/itm/165098702624?hash=item2670a64720:g:PSUAAOSwJfxhVGDD')
// scrapeProduct('https://www.amazon.co.uk/Bosch-Detector-Truvo-batteries-detection/dp/B01J1FN7ZE?ref_=Oct_DLandingS_D_12b94313_60&smid=A3P5ROKL5A1OLE')

console.log('hiii');