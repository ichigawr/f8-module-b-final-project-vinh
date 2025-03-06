const productPageHandler = ({ id, stock, images }) => {
  if (!images) return;

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const img = document.querySelector(".product__left-content img");
  const decreaseBtn = document.getElementById("decrease-btn");
  const increaseBtn = document.getElementById("increase-btn");
  const inputQuantity = document.querySelector("#input-quantity input");
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

  decreaseBtn.addEventListener("click", () => {
    if (inputQuantity.value > 1) inputQuantity.value--;
  });

  increaseBtn.addEventListener("click", () => {
    if (inputQuantity.value < stock) inputQuantity.value++;
  });

  inputQuantity.addEventListener("input", () => {
    inputQuantity.value = inputQuantity.value.replace(/[^0-9]/g, "");
    if (inputQuantity.value > stock) inputQuantity.value = stock;
    else if (inputQuantity.value < 1) inputQuantity.value = 1;
  });

  addCartBtn.addEventListener("click", () => {
    try {
      const cart = JSON.parse(localStorage.cart);
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
