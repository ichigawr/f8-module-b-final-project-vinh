import "./QuantityInput.css";

function QuantityInput() {
  return `
    <div class="input-quantity">
      <button class="decrease-btn">
        <i class="fa-solid fa-minus"></i>
      </button>
      <input type="text" value="1" />
      <button class="increase-btn">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  `;
}

export default QuantityInput;
