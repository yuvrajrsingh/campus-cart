# 🛒 CampusCart

CampusCart is a React-based marketplace application where users can browse products, search and filter listings, view product details, and manage a persistent shopping cart.

The project also includes a seller dashboard for viewing and creating product listings through a FastAPI backend.

## ✨ Features

### 🛍️ Product Marketplace

- Browse products from the DummyJSON API
- Search products
- Filter products by category
- Sort products by price
- Pagination
- View individual product details
- Product image gallery

### 🛒 Shopping Cart

- Add products to the cart
- Increase/decrease product quantity
- Remove products
- Calculate total cart price
- Persist cart data using `localStorage`
- Cart survives page refreshes

### 👨‍💼 Seller Dashboard

- View seller listings
- Add new listings
- Submit listing information to a FastAPI backend
- Automatically refresh listings after adding a product
- Display submission confirmation

### ⚡ Data Fetching

- TanStack Query for server-state management
- Query caching
- Query invalidation after mutations
- Loading states

### 🧭 Routing

- TanStack Router
- Product detail routes using dynamic route parameters
- Cart route
- Seller dashboard route

---

## 🛠️ Tech Stack

- **React**
- **Vite**
- **TanStack Router**
- **TanStack Query**
- **JavaScript**
- **FastAPI**
- **DummyJSON API**
- **localStorage**
- **Vercel** for the FastAPI backend

---

## 📁 Project Structure

```text
src/
├── api/
│   ├── getProduct.js
│   ├── getProducts.js
│   ├── getProductsCategory.js
│   └── seller.js
│
├── routes/
│   ├── __root.jsx
│   ├── index.jsx
│   ├── cart.jsx
│   ├── seller.jsx
│   └── products/
│       └── $productId.jsx
│
├── contexts.jsx
├── Header.jsx
├── Card.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd CampusCart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

---

## 🔌 APIs

### Product API

CampusCart uses the [DummyJSON](https://dummyjson.com/) API for product data.

Products are used for:

- Product listing
- Search
- Category filtering
- Sorting
- Product details

### Seller API

Seller functionality communicates with a FastAPI backend:

```text
https://fastapi-seller.vercel.app/
```

The Vite development server proxies seller API requests through `/api`.

---

## 🛒 Cart Persistence

Cart data is stored in the browser using `localStorage`.

The cart is loaded when the application starts:

```js
const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart ? JSON.parse(savedCart) : [];
});
```

Whenever the cart changes, it is saved:

```js
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```

This means cart contents remain available after refreshing the page.

---

## 📦 Cart Data Structure

Each product in the cart is stored with its quantity:

```js
[
  {
    product: {
      id: 1,
      title: "Product",
      price: 100,
    },
    quantity: 2,
  },
];
```

This allows the application to calculate individual quantities and the total cart price.

---

## 🔄 TanStack Query

TanStack Query is used for fetching and caching server data.

For example:

```js
const { data, isLoading } = useQuery({
  queryKey: ["listings"],
  queryFn: getListings,
});
```

After creating a seller listing, the listings query is invalidated:

```js
queryClient.invalidateQueries({
  queryKey: ["listings"],
});
```

This causes the latest listing data to be fetched again.

---

## 🧭 Routes

| Route                  | Description         |
| ---------------------- | ------------------- |
| `/`                    | Product marketplace |
| `/products/:productId` | Product details     |
| `/cart`                | Shopping cart       |
| `/seller`              | Seller dashboard    |

---

## 📚 What I Learned

This project was built as a practical React learning project and covers:

- React components
- React state management
- Context API
- `useState`
- `useEffect`
- React event handling
- Form handling
- `localStorage`
- API requests with `fetch`
- TanStack Query
- Mutations and query invalidation
- TanStack Router
- Dynamic routes
- Route parameters
- Vite proxy configuration
- Working with a FastAPI backend

---

## 🔮 Future Improvements

Some planned improvements include:

- User authentication
- Better product UI
- Product quantity controls on product pages
- Checkout functionality
- Seller update/delete functionality
- Form validation
- Error handling and error states
- Responsive/mobile design
- Backend database integration
- Order history

---

## 📸 Screenshots

Add screenshots of the application here:

```text
screenshots/
├── home.png
├── product-details.png
├── cart.png
└── seller-dashboard.png
```

---

## 📄 License

This project is intended as a learning project and portfolio application.
