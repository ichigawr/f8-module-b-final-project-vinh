import "./ProductPage.css";

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

  if (
    !title ||
    !description ||
    !price ||
    !discountPercentage ||
    !rating ||
    !stock ||
    !images
  ) {
    return `<div id="product">Product not found.</div>`;
  }

  const newPrice = price - (price * discountPercentage) / 100;
  const inStock = stock > 0;

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
              <span>-${discountPercentage}%</span>
            </p>`
          }
          <p class="new-price">$${newPrice.toFixed(2)}</p>
          <small>${description}</small>
        </div>

        <div id="stock">
          <i
            class="fa-solid fa-circle"
            style="color: ${
              inStock ? (stock >= 20 ? "#00d98b" : "orange") : "red"
            }"
          ></i>
          ${
            inStock &&
            `<div id="input-quantity">
              <button id="decrease-btn">
                <i class="fa-solid fa-minus"></i>
              </button>
              <input type="text" value="1" />
              <button id="increase-btn">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>`
          }
          <span>${inStock ? `${stock} in stock` : "Out of stock"}.</span>
        </div>

        <button id="add-cart-btn">Add to cart</button>
      </div>
    </div>
  `;
}

export default ProductPage;
