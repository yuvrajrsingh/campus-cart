import { createFileRoute } from "@tanstack/react-router";
import Card from "../Card";
import getProducts from "../api/getProducts";
import getProductsCategory from "../api/getProductsCategory";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("asc");
  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getProductsCategory());
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setActiveSearch(searchQuery);
      setSkip(0);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  const { isLoading, data } = useQuery({
    queryKey: ["products", skip, activeSearch, activeFilter, sort],
    queryFn: () => getProducts(skip, activeSearch, activeFilter, sort),
    staleTime: 30000,
    placeholderData: keepPreviousData,
  });
  const products = data?.products ?? [];
  const isCombinedFilter = Boolean(activeSearch && activeFilter);
  const filteredProducts = isCombinedFilter
    ? products.filter((product) =>
        product.title.toLowerCase().includes(activeSearch.toLowerCase()),
      )
    : products;
  const displayedProducts = isCombinedFilter
    ? filteredProducts.slice(skip, skip + 30)
    : filteredProducts;
  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={activeFilter}
          onChange={(e) => {
            setActiveFilter(e.target.value);
            setSkip(0);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setSkip(0);
          }}
        >
          <option value="asc">Cheapest</option>
          <option value="desc">Costliest</option>
        </select>
        {displayedProducts.map((product) => {
          return (
            <Link
              key={product.id}
              to="/products/$productId"
              params={{ productId: product.id }}
            >
              <Card
                name={product.title}
                image={product.images[0]}
                price={product.price}
                category={product.category}
              />
            </Link>
          );
        })}
        <button
          disabled={skip === 0}
          onClick={() => setSkip((currentSkip) => currentSkip - 30)}
        >
          Previous
        </button>
        <button
          disabled={
            isCombinedFilter
              ? skip + 30 >= filteredProducts.length
              : products.length < 30
          }
          onClick={() => setSkip((currentSkip) => currentSkip + 30)}
        >
          Next
        </button>
      </div>
    </>
  );
}
