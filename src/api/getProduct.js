export default async function getProduct(productId) {
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  const body = await response.json();
  return body;
}
