export default async function getProducts(
  skip = 0,
  search = "",
  filter = "",
  sort = "asc",
) {
  let baseUrl = "https://dummyjson.com/products";

  if (filter) {
    baseUrl += `/category/${encodeURIComponent(filter)}`;
  } else if (search) {
    baseUrl += "/search";
  }

  const params = new URLSearchParams();

  if (filter && search) {
    params.append("limit", "0");
  } else {
    params.append("limit", "30");
    params.append("skip", skip.toString());
  }

  params.append("sortBy", "price");
  params.append("order", sort);

  if (search && !filter) {
    params.append("q", search);
  }

  const finalUrl = `${baseUrl}?${params.toString()}`;

  const response = await fetch(finalUrl);
  const body = await response.json();
  return body;
}
