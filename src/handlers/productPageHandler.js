import renderHeader from "../layouts/Header";
import sliderHandler from "./sliderHandler";
import quantityInputHandler from "./quantityInputHandler";
import { showNotification } from "../utils";

const productPageHandler = (product) => {
  const { id, images } = product;

  if (!id || !images) return;

  sliderHandler(images);
  quantityInputHandler();

  const addToCartBtn = document.getElementById("add-to-cart-btn");

  addToCartBtn.addEventListener("click", () => {
    try {
      const cart = JSON.parse(localStorage.cart);
      const inputQuantity = document.querySelector(".input-quantity input");
      const cartItem = {
        ...product,
        quantity: parseInt(inputQuantity.value),
      };
      const index = cart.findIndex((item) => item.id === id);

      if (index === -1) cart.push(cartItem);
      else cart[index].quantity += cartItem.quantity;

      localStorage.cart = JSON.stringify(cart);
      renderHeader();
      showNotification("Added to cart!", "success");
    } catch (error) {
      console.error(error);
    }
  });
};

export default productPageHandler;
