export default async function getProductsCategory() {
  const response = await fetch("https://dummyjson.com/products/category-list");
  const body = await response.json();
  return body;
}
