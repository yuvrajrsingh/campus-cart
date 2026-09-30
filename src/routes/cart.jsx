import { createFileRoute } from "@tanstack/react-router";
import { CartContext } from "../contexts";
import { useContext } from "react";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

function Cart() {
  const [cart, setCart] = useContext(CartContext);
  let total = 0;
  for (const c of cart) {
    total += c.product.price * c.quantity;
  }
  return (
    <>
      {cart.map((item) => {
        return (
          <pre key={item.product.id}>
            <button
              onClick={() =>
                setCart((currentCart) =>
                  currentCart.filter((i) => i.product.id !== item.product.id),
                )
              }
            >
              X
            </button>{" "}
            {item.product.title} |{" "}
            <button
              disabled={item.quantity <= 1}
              onClick={() =>
                setCart((currentCart) =>
                  currentCart.map((i) =>
                    i.product.id === item.product.id
                      ? { ...i, quantity: i.quantity - 1 }
                      : i,
                  ),
                )
              }
            >
              -
            </button>{" "}
            Quantity: {item.quantity}{" "}
            <button
              disabled={item.quantity >= item.product.stock}
              onClick={() =>
                setCart((currentCart) =>
                  currentCart.map((i) =>
                    i.product.id === item.product.id
                      ? { ...i, quantity: i.quantity + 1 }
                      : i,
                  ),
                )
              }
            >
              +
            </button>
          </pre>
        );
      })}
      <p>${total.toFixed(2)}</p>
    </>
  );
}
