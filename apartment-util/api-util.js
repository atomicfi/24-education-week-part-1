export async function searchDetails({ query }) {
  const url = `https://sapi.craigslist.org/web/v8/postings/search/full?batch=56-0-360-0-0&cc=US&lang=en&query=${encodeURIComponent(
    query
  )}&searchPath=apa`;
  const response = await fetch(url)
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });

  return response?.data?.items ?? [];
}

export async function searchApartments({ query }) {
  const url = `https://saltlakecity.craigslist.org/search/apa?query=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(url)
    .then((res) => res.text())
    .catch((e) => {
      console.error(e);
    });

  return response;
}

export async function markFavorite({ id }) {
  const cookie =
    "cl_def_hp=saltlakecity; cl_b=4|644b68e5dbc32c7ca7d95c27a4577ba5bea47f62|1711039580LhOLw; cl_chat=%7B%22displayState%22%3A%22none%22%2C%22filter%22%3A%22allActive%22%2C%22searchFilter%22%3A%22%22%2C%22orderer%22%3A%22recent%22%2C%22ordererDirection%22%3A%22ascending%22%2C%22dismissedMessageIds%22%3A%22%22%7D; cl_tocmode=hhh%3Agrid; cl_login=392976130%3Adan%40atomicfi.com; cl_session=tDte5PptWzmIYG8ZxMFSNMCVFXiU7piCU3ekKauutW5mcHWZ8xKKoNLTyTgbVtYh";

  const response = await fetch(
    "https://wapi.craigslist.org/web/v8/user/favorites/sync?cc=US&lang=en",
    {
      headers: {
        origin: "https://saltlakecity.craigslist.org",
        referer: "https://saltlakecity.craigslist.org/",
        cookie,
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      withCredentials: true,
      body: `favesToAdd=${id}`,
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });

  return response;
}
