import CartPage from "../pages/CartPage";
import quantityInputHandler from "./quantityInputHandler";
import { render, router } from "../main";
import { patch } from "../api";

const cartPageHandler = (cart) => {
  if (!Array.isArray(cart)) {
    console.error("Invalid cart data");
    return;
  }

  if (!cart.length) return;

  quantityInputHandler();

  const removeFromCartBtns = document.getElementsByClassName(
    "remove-from-cart-btn"
  );
  const checkoutBtn = document.getElementById("checkout-btn");
  const cartCount = document.getElementById("cart-count");

  Array.from(removeFromCartBtns).forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const updatedCart = cart.filter((_, i) => i !== index);
      localStorage.cart = JSON.stringify(updatedCart);
      cartCount.textContent = updatedCart.length;
      render(CartPage, cartPageHandler, updatedCart);
    });
  });

  checkoutBtn.addEventListener("click", () => {
    cart.forEach(({ id, quantity, stock }) => {
      const newStock = { stock: stock - quantity };
      patch(newStock, `products/${id}`);
    });

    localStorage.cart = JSON.stringify([]);
    cartCount.textContent = 0;
    router.navigate("/checkout-success");
  });
};

export default cartPageHandler;
