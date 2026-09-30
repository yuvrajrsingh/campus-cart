import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../Header";
import { CartProvider } from "../contexts";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <CartProvider>
        <Header />
        <Outlet />
      </CartProvider>
    </>
  );
}
