import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const [headerBtnHighlight, setHeaderBtnHighlight] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItem = items.reduce(
    (currValue, item) => currValue + item.amount,
    0
  );

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setHeaderBtnHighlight(true);
    const timer = setTimeout(() => {
      setHeaderBtnHighlight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const btnClass = `${classes.button} ${
    headerBtnHighlight ? classes.bump : ""
  }`;
  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};
export default HeaderCartButton;
