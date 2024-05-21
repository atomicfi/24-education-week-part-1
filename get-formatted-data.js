export async function getFormattedData(page, listItems, filterText) {
  const filteredItems = [];
  for (let i = 0; i < listItems.length; i++) {
    const title = await page.evaluate((element) => element.title, listItems[i]);
    if (title.toLowerCase().includes(filterText)) {
      const { price, miles, link } = await page.evaluate((element) => {
        return {
          price: element?.querySelector(".priceinfo").innerText,
          miles: element
            ?.querySelector(".meta")
            .innerHTML.split('<span class="separator">·</span>')[1],
          link: element?.querySelector("a").href,
        };
      }, listItems[i]);

      filteredItems.push({
        title,
        miles,
        link,
        price,
      });
    }
  }
  return filteredItems;
}
