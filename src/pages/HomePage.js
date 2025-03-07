import "./HomePage.css";
import Slider from "../components/Slider";

function ProductsSection(categorizedProducts) {
  if (!Array.isArray(categorizedProducts)) {
    console.error("Categorized products is not an array");
    return;
  }

  return `
    ${categorizedProducts
      .map(
        ({ category, products }) => `
            <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div class="products-container">
              ${products
                .map(
                  ({
                    id,
                    title,
                    price,
                    discountPercentage,
                    rating,
                    thumbnail,
                  }) => `
                    <div class="product-card" data-id="${id}">
                      <img src="${thumbnail}" alt="${title}" />
                      <h3>${title}</h3>
                      <p>
                        ${discountPercentage > 0 ? `<del>$${price}</del>` : ""}
                        ${`$${(
                          price -
                          (price * discountPercentage) / 100
                        ).toFixed(2)}`}
                      </p>
                      <p>
                        <i class="fa-solid fa-star" style="color: #fbb346"></i>
                        ${rating}
                      </p>
                    </div>
                  `
                )
                .join("")}
            </div>
          `
      )
      .join("")}
  `;
}

function HomePage(_, categorizedProducts, featuredProducts) {
  if (!Array.isArray(categorizedProducts)) {
    console.error("Categorized products is not an array");
    return;
  }

  if (!Array.isArray(featuredProducts)) {
    console.error("Featured products is not an array");
    return;
  }

  return `
    <div style="width: 700px; height: 300px; margin: 2rem auto 0">
      ${Slider(featuredProducts, "Featured Product")}
    </div>
    <h1 style="margin: 5rem 0; text-align: center">Products</h1>
    <input type="text" id="search-input" placeholder="Search products" />
    <div id="search-results"></div>
    <div id="sorting-options">
      <label for="sort">Sort by:</label>
      <select id="sort">
        <option value="default">Default</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
      <div>
        <label>
          <input type="radio" id="ascending" name="sort-order" checked />
          <span>Ascending</span>
        </label>
        <label>
          <input type="radio" id="descending" name="sort-order" />
          <span>Descending</span>
        </label>
      </div>
    </div>
    <div id="homepage__products">
      ${ProductsSection(categorizedProducts)}
    </div>
  `;
}

export default HomePage;
export { ProductsSection };
