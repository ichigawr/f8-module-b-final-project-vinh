const quantityInputHandler = () => {
  const inputQuantityElements =
    document.getElementsByClassName("input-quantity");

  Array.from(inputQuantityElements).forEach((element) => {
    const decreaseBtn = element.querySelector(".decrease-btn");
    const increaseBtn = element.querySelector(".increase-btn");
    const inputQuantity = element.querySelector("input");
    const id = Number(inputQuantity.getAttribute("data-id"));
    const stock = Number(inputQuantity.getAttribute("data-stock"));

    decreaseBtn.addEventListener("click", () => {
      if (inputQuantity.value > 1) {
        inputQuantity.value--;
        inputQuantity.dispatchEvent(new Event("input"));
      }
    });

    increaseBtn.addEventListener("click", () => {
      if (inputQuantity.value < stock) {
        inputQuantity.value++;
        inputQuantity.dispatchEvent(new Event("input"));
      }
    });

    inputQuantity.addEventListener("input", () => {
      inputQuantity.value = inputQuantity.value.replace(/[^0-9]/g, "");
      if (inputQuantity.value > stock) inputQuantity.value = stock;
      else if (inputQuantity.value < 1) inputQuantity.value = 1;

      const isCartPage = window.location.pathname.includes("/cart");

      if (isCartPage) {
        try {
          const cart = JSON.parse(localStorage.cart);
          const index = cart.findIndex((item) => item.id === id);
          cart[index].quantity = Number(inputQuantity.value);
          localStorage.cart = JSON.stringify(cart);
        } catch (error) {
          console.error(error);
        }
      }
    });
  });
};

export default quantityInputHandler;
