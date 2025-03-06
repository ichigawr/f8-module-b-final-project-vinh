const quantityInputHandler = (stock) => {
  const inputQuantityElements =
    document.getElementsByClassName("input-quantity");

  for (let i = 0; i < inputQuantityElements.length; i++) {
    const decreaseBtn = inputQuantityElements[i].querySelector(".decrease-btn");
    const increaseBtn = inputQuantityElements[i].querySelector(".increase-btn");
    const inputQuantity = inputQuantityElements[i].querySelector("input");

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
  }
};

export default quantityInputHandler;
