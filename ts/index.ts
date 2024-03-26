import "./css/styles.css";
import "./css/about-us_styles.css";
import "./css/cart_styles.css";
import "./css/index_styles.css";
import "./css/menu_styles.css";
import "./css/modify_styles.css";

import {
  displayNavigationBar,
  displayFooter,
  renderDishesInMenu,
  displayProductsInCart,
  generateCartSummary,
  renderModifyPage,
} from "./utils";

interface Cart {
  [key: string]: number;
}

let cart: Cart;

let item = localStorage.getItem("cart");
if (item) cart = JSON.parse(item);
else cart = {};

let items_in_cart = Object.entries(cart).filter(([key, value]) => {
  return value > 0;
});

displayNavigationBar("toolbar");

renderDishesInMenu(cart);
renderModifyPage();

items_in_cart.forEach((element) => {
  displayProductsInCart(element[0], cart);
});

let total_amount: HTMLElement | null = document.getElementById("total-amount");

generateCartSummary(total_amount);

displayFooter("page-footer");

export { items_in_cart };
