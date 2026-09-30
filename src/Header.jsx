import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import { CartContext } from "./contexts";

const Header = () => {
  const [cart] = useContext(CartContext);
  return (
    <nav>
      <Link to="/">
        <h1>Campus Cart</h1>
      </Link>
      <Link to="/cart">
        <span>{cart.length}</span>
      </Link>
      <Link to="/seller">
        <h3>Seller Dashboard</h3>
      </Link>
    </nav>
  );
};

export default Header;
