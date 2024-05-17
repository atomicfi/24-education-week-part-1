import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://saltlakecity.craigslist.org/");

  await page.setViewport({ width: 1080, height: 1024 });

  const searchXpath =
    'xpath///div[@class="cl-search-dropdown"]//input[@placeholder="search craigslist"]';

  // Wait for selector
  await page.waitForSelector(searchXpath);

  // Type into search box
  await page.type(searchXpath, "tesla model 3");

  // Press Enter
  await page.keyboard.press("Enter");

  // Optional: Wait for results to load or some specific action
  await page.waitForNavigation();
})();
