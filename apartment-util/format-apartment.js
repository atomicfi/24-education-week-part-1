export async function formatApartment({ handle }) {
  const price = await getProperty({
    handle,
    selector: "span.priceinfo",
    property: "innerText",
  });
  const size = await getProperty({
    handle,
    selector: "span.post-sqft",
    property: "innerText",
  });

  const meta = await getProperty({
    handle,
    selector: "div.meta",
    property: "innerText",
  });
  const location = meta.split("·")[2];

  const link = await getProperty({
    handle,
    selector: "a",
    property: "href",
  });

  const formattedPrice = parseInt(price.replace(/\D/g, ""));

  return { price: formattedPrice, size: size?.split("ft")[0], location, link };
}

async function getProperty({ handle, selector, property }) {
  const element = await handle.$(selector);
  return await element?.evaluate(
    (element, property) => element[property],
    [property]
  );
}
