import renderHeader from "../layouts/Header";
import CartPage from "../pages/CartPage";
import quantityInputHandler from "./quantityInputHandler";
import { render, router } from "../main";
import { patch } from "../api";

const calculateTotal = (cart) => {
  const cartTotal = document.getElementById("cart-total");
  const total = cart.reduce(
    (total, { price, discountPercentage, quantity }) =>
      total + (price - (price * discountPercentage) / 100) * quantity,
    0
  );

  cartTotal.textContent = cart.length > 0 ? `Total: $${total.toFixed(2)}` : "";
}

const cartPageHandler = (cart) => {
  if (!Array.isArray(cart)) {
    console.error("Invalid cart data");
    return;
  }

  if (!cart.length) return;

  quantityInputHandler();
  calculateTotal(cart);

  const removeFromCartBtns = document.getElementsByClassName(
    "remove-from-cart-btn"
  );
  const checkoutBtn = document.getElementById("checkout-btn");

  Array.from(removeFromCartBtns).forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const updatedCart = cart.filter((_, i) => i !== index);
      localStorage.cart = JSON.stringify(updatedCart);
      renderHeader();
      render(CartPage, cartPageHandler, updatedCart);
    });
  });

  checkoutBtn.addEventListener("click", () => {
    cart.forEach(({ id, quantity, stock }) => {
      const newStock = { stock: stock - quantity };
      patch(newStock, `products/${id}`);
    });

    localStorage.cart = JSON.stringify([]);
    renderHeader();
    router.navigate("/checkout-success");
  });
};

export default cartPageHandler;
export { calculateTotal };
