import puppeteer from "puppeteer";
import { formatApartment } from "./apartment-util/format-apartment.js";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://saltlakecity.craigslist.org/search/apa");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  const searchXpath =
    'xpath///div[contains(@class, "cl-query-with-search-suggest")]//input';

  // Wait for the selector
  await page.waitForSelector(searchXpath);

  // Type into search box
  await page.type(searchXpath, "studio");

  // Press Enter
  await page.keyboard.press("Enter");

  // Optional: Wait for results to load or some specific action
  await page.waitForNavigation();

  const listItemSelector =
    'xpath///div[contains(@class, "cl-results-page")]//ol/li';

  // Get the list of items
  const listItems = await page.$$(listItemSelector);
  const formattedApartments = [];
  for (const apartmentHandle of listItems) {
    formattedApartments.push(
      await formatApartment({ handle: apartmentHandle })
    );
  }

  // filter to price less that 1000

  // favorite each in list

  console.log(formattedApartments);
})();
