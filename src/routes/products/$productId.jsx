import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import getProduct from "../../api/getProduct";
import { CartContext } from "../../contexts";
import { useContext } from "react";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetails,
});

function ProductDetails() {
  const [cart, setCart] = useContext(CartContext);
  const { productId } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      {data.images.map((image) => {
        return <img key={image} src={image} width="300px" alt={data.title} />;
      })}
      <p>${data.price}</p>
      <p>{data.description}</p>
      <p>Stock: {data.stock}</p>
      <p>{data.shippingInformation}</p>
      <button
        onClick={() => {
          const existingProduct = cart.find(
            (item) => item.product.id === data.id,
          );
          if (existingProduct) {
            setCart(
              cart.map((item) =>
                item.product.id === data.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            );
          } else {
            setCart([...cart, { product: data, quantity: 1 }]);
          }
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
