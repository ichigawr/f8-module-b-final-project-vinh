import quantityInputHandler from "./quantityInputHandler";

const productPageHandler = ({ id, stock, images }) => {
  if (!images) return;

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const img = document.querySelector(".product__left-content img");
  const addCartBtn = document.getElementById("add-cart-btn");
  const cartCount = document.getElementById("cart-count");
  let index = 0;

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    img.src = images[index];
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    img.src = images[index];
  });

  quantityInputHandler(stock);

  addCartBtn.addEventListener("click", () => {
    try {
      const cart = JSON.parse(localStorage.cart);
      const inputQuantity = document.querySelector(".input-quantity input");
      const product = { id, quantity: parseInt(inputQuantity.value) };
      const index = cart.findIndex((item) => item.id === product.id);

      if (index === -1) {
        cart.push(product);
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
      } else cart[index].quantity += product.quantity;

      localStorage.cart = JSON.stringify(cart);
    } catch (error) {
      console.error(error);
    }
  });
};

export default productPageHandler;
