import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://saltlakecity.craigslist.org/search/cta");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  const searchXpath =
    'xpath///div[contains(@class, "cl-query-with-search-suggest")]//input';

  // Wait for the selector
  await page.waitForSelector(searchXpath);

  // Type into search box
  await page.type(searchXpath, "tesla model 3");

  // Press Enter
  await page.keyboard.press("Enter");

  // Optional: Wait for results to load or some specific action
  await page.waitForNavigation();

  const listItemSelector =
    'xpath///div[contains(@class, "cl-results-page")]//ol/li';

  // Get the list of items
  const listItems = await page.$$(listItemSelector);
  const filteredItems = [];

  // Iterate through the list items
  for (let i = 0; i < listItems.length; i++) {
    // Get the text content of the list item
    const text = await page.evaluate(
      (element) => element.textContent,
      listItems[i]
    );

    // Check if the text matches the specific text you are looking for
    if (text.toLowerCase().includes("tesla")) {
      filteredItems.push(listItems[i]);
    }
  }
  console.log(filteredItems);
})();
