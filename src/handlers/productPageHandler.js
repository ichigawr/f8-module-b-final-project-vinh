import sliderHandler from "./sliderHandler";
import quantityInputHandler from "./quantityInputHandler";
import { showNotification } from "../utils";

const productPageHandler = ({ id, title, price, stock, images, thumbnail }) => {
  if (!id || !title || !price || !stock || !thumbnail) return;

  sliderHandler(images);
  quantityInputHandler();

  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const cartCount = document.getElementById("cart-count");

  addToCartBtn.addEventListener("click", () => {
    try {
      const cart = JSON.parse(localStorage.cart);
      const inputQuantity = document.querySelector(".input-quantity input");
      const product = {
        id,
        title,
        price,
        stock,
        thumbnail,
        quantity: parseInt(inputQuantity.value),
      };
      const index = cart.findIndex((item) => item.id === product.id);

      if (index === -1) {
        cart.push(product);
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
      } else cart[index].quantity += product.quantity;

      localStorage.cart = JSON.stringify(cart);
      showNotification("Added to cart!", "success");
    } catch (error) {
      console.error(error);
    }
  });
};

export default productPageHandler;
