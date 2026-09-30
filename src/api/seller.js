const API_URL = "https://fastapi-seller.vercel.app";

export async function getListings() {
  const response = await fetch(`${API_URL}/seller/`);
  const body = response.json();
  return body;
}

export async function addListing(
  title,
  description,
  category,
  price,
  stock,
  shipping_info,
) {
  await fetch(`${API_URL}/seller/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      category,
      price,
      stock,
      shipping_info,
    }),
  });
}

export async function updateListing(
  id,
  title,
  description,
  category,
  price,
  stock,
  shipping_info,
) {
  await fetch(`${API_URL}/seller/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      category,
      price,
      stock,
      shipping_info,
    }),
  });
}

export async function deleteListing(id) {
  await fetch(`${API_URL}/seller/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
