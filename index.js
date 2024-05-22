import {
  searchApartments,
  searchDetails,
  markFavorite,
} from "./apartment-util/api-util.js";
import cheerio from "cheerio";

(async () => {
  const query = "studio";

  // extract title and id from page
  const apartmentsHtml = await searchApartments({ query });

  const $ = cheerio.load(apartmentsHtml);

  const apartments = $("li.cl-static-search-result")
    .toArray()
    .map((el) => {
      const title = $(el).attr("title");
      const href = $(el).find("a").attr("href");
      const id = href.match(/\/(\d+)\.html/)[1];

      return { title, id };
    })
    .filter(({ id, title }) => id && title);

  // add details from searchDetails
  const details = await searchDetails({ query });
  // const apartmentsWithDetails = apartments.map(({ id, title }) => {
  //   const apartmentDetail = details.find((detail) => {
  //     return title.includes(detail[8]);
  //   });

  //   // todo: decode other detail fields

  //   return { id, title, rent: apartmentDetail?.[3] };
  // });
  const apartmentsWithDetails = [];
  for (const apartment of apartments) {
    const apartmentDetail = details.find((detail) => {
      return apartment.title.includes(detail[8]);
    });

    apartmentsWithDetails.push({
      id: apartment.id,
      title: apartment.title,
      rent: apartmentDetail?.[3],
    });
  }

  console.log(apartmentsWithDetails);

  const cheapApartments = apartmentsWithDetails.filter((apartment) => {
    return apartment.rent < 1000;
  });

  for (const apartment of cheapApartments) {
    await markFavorite({ id: apartment.id });
  }
})();
