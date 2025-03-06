import "./ProductPage.css";
import { get } from "../api/api";

function ProductPage(product) {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    images,
  } = product;
  const newPrice = price - (price * discountPercentage) / 100;

  return `
    <div id="product">
      <div class="product__left-content">
        <img src="${images[0]}" alt="${title}" />
        ${
          images.length > 1 &&
          `<button id="prev-btn">
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <button id="next-btn">
            <i class="fa-solid fa-angle-right"></i>
          </button>`
        }
      </div>

      <div class="product__right-content">
        <div id="product__title">
          <p>
            <i class="fa-solid fa-star" style="color: #fbb346"></i>
            ${rating}
          </p>
          <h1>${title}</h1>
        </div>

        <div id="product__price">
          ${
            discountPercentage > 0 &&
            `<p class="old-price">
              <del>$${price}</del>
              <span>- ${discountPercentage}%</span>
            </p>`
          }
          <p class="new-price">$${newPrice.toFixed(2)}</p>
          <small>${description}</small>
        </div>

        <button id="add-to-cart-btn">Add to cart</button>

        <p id="stock">
          <i
            class="fa-solid fa-circle"
            style="color: ${
              stock > 0 ? (stock >= 20 ? "#00d98b" : "orange") : "red"
            }"
          ></i>
          ${stock} in stock.
        </p>

        <div id="sub-buttons">
          <button><i class="fa-solid fa-scale-balanced"></i>Add to cart</button>
          <button><i class="fa-regular fa-heart"></i>Add to wishlist</button>
        </div>
      </div>
    </div>
  `;
}

export default ProductPage;
