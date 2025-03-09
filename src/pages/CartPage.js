import "./CartPage.css";
import QuantityInput from "../components/QuantityInput";

function CartPage(cart) {
  if (!Array.isArray(cart)) return `<h1>Invalid cart data</h1>`;
  if (!cart.length) return `<h1>Your cart is empty</h1>`;

  return `
    <div id="cart">
      <div id="cart-items">
        ${cart
          .map(
            ({
              id,
              title,
              price,
              discountPercentage,
              stock,
              thumbnail,
              quantity,
            }) => {
              const newPrice = price - (price * discountPercentage) / 100;

              return `
                <div class="cart-item">
                  <img src="${thumbnail}" alt="${title}" class="cart-thumbnail" />
                  <div>
                    <p class="cart-item-title">${title}</p>
                    <div class="cart-item-details">
                      <p>
                        <span><del>$${price}</del></span>
                        <span><strong>$${newPrice.toFixed(2)}</strong></span>
                      </p>
                      <div class="cart-quantity">
                        ${QuantityInput(id, stock, quantity)}
                        <button class="remove-from-cart-btn">
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }
          )
          .join("")}
      </div>

      <p id="cart-total">
        Total: $${cart
          .reduce(
            (total, { price, discountPercentage, quantity }) =>
              total + (price - (price * discountPercentage) / 100) * quantity,
            0
          )
          .toFixed(2)}
      </p>
  
      <button id="checkout-btn">Checkout</button>
    </div>
  `;
}

export default CartPage;
