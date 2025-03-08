import Toastify from "toastify-js";
import sliderHandler from "./sliderHandler";
import quantityInputHandler from "./quantityInputHandler";

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

      Toastify({
        text: "Added to cart!",
        duration: 3000,
        gravity: "top",
        stopOnFocus: true,
        style: {
          position: "absolute",
          right: "10px",
          marginTop: "60px",
          background: `linear-gradient(to right, #4caf50, #2e7d32)`,
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  });
};

export default productPageHandler;
