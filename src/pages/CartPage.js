import "./CartPage.css";
import QuantityInput from "../components/QuantityInput";

function CartPage(cart) {
  if (!Array.isArray(cart)) return `<h1>Invalid cart data</h1>`;
  if (!cart.length) return `<h1>Your cart is empty</h1>`;

  return `
    <div id="cart">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${cart
            .map(
              ({ id, title, price, stock, thumbnail, quantity }, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>
                    <img src="${thumbnail}" alt="${title}" class="cart-thumbnail" />
                  </td>
                  <td>${title}</td>
                  <td>$${price}</td>
                  <td>
                    <div class="cart-quantity">
                      ${QuantityInput(id, stock, quantity)}
                      <button class="remove-from-cart-btn">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
  
      <button id="checkout-btn">Checkout</button>
    </div>
  `;
}

export default CartPage;
