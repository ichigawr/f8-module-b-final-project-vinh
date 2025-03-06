import "./QuantityInput.css";

function QuantityInput(id = null, stock = null, quantity = 1) {
  if (id === null) {
    console.error("ID value is required.");
    return;
  }

  if (stock === null) {
    console.error("Stock value is required.");
    return;
  }

  if (quantity > stock) quantity = stock;

  return `
    <div class="input-quantity">
      <button class="decrease-btn">
        <i class="fa-solid fa-minus"></i>
      </button>
      <input type="text" value="${quantity}" data-id="${id}" data-stock="${stock}" />
      <button class="increase-btn">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  `;
}

export default QuantityInput;
