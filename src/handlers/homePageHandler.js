import { ProductsSection } from "../pages/HomePage";
import sliderHandler from "./sliderHandler";
import { router } from "../main";

const getFeaturedProducts = (products) => {
  if (!Array.isArray(products)) {
    console.error("Products is not an array");
    return;
  }

  return products
    .filter((product) => product.stock > 0)
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;

      if (b.reviews.length !== a.reviews.length)
        return b.reviews.length - a.reviews.length;

      if (b.discountPercentage !== a.discountPercentage)
        return b.discountPercentage - a.discountPercentage;

      if (b.stock !== a.stock) return b.stock - a.stock;

      return new Date(b.meta.createdAt) - new Date(a.meta.createdAt);
    })
    .slice(0, 5)
    .map((product) => product.thumbnail);
};

const getCategorizedProducts = (products) => {
  if (!Array.isArray(products)) {
    console.error("Products is not an array");
    return;
  }

  const productsByCategories = products.reduce((result, product) => {
    const { category } = product;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(product);
    return result;
  }, {});

  const categorizedProducts = Object.entries(productsByCategories).map(
    ([category, products]) => ({
      category,
      products,
    })
  );

  return categorizedProducts;
};

const sortHandler = (categorizedProducts) => {
  const sortSelect = document.getElementById("sort");
  const sortOrderRadios = document.getElementsByName("sort-order");
  const productsContainer = document.getElementById("homepage__products");
  let sortOrder = Array.from(sortOrderRadios).find((radio) => radio.checked).id;

  const sortedProducts = () => {
    if (sortSelect.value === "default") {
      return categorizedProducts;
    }

    return categorizedProducts.map(({ category, products }) => ({
      category,
      products: [...products].sort((a, b) => {
        if (sortSelect.value === "price") {
          const aPrice = a.price - (a.price * a.discountPercentage) / 100;
          const bPrice = b.price - (b.price * b.discountPercentage) / 100;
          return sortOrder === "ascending" ? aPrice - bPrice : bPrice - aPrice;
        }

        if (sortSelect.value === "rating") {
          return sortOrder === "ascending"
            ? a.rating - b.rating
            : b.rating - a.rating;
        }

        return 0;
      }),
    }));
  };

  sortSelect.addEventListener("change", () => {
    productsContainer.innerHTML = ProductsSection(sortedProducts());
  });

  sortOrderRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      sortOrder = radio.id;
      productsContainer.innerHTML = ProductsSection(sortedProducts());
    });
  });
};

const searchHandler = (products) => {
  const searchInput = document.getElementById("search-input");
  const resultsDropdown = document.getElementById("search-results");

  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const handleSearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    const filteredProducts = products.filter(({ title }) =>
      title.toLowerCase().includes(query)
    );

    if (query === "") {
      resultsDropdown.innerHTML = "";
      resultsDropdown.style.display = "none";
      return;
    }

    resultsDropdown.innerHTML = filteredProducts.length
      ? filteredProducts
          .slice(0, 5)
          .map(
            (product) => `
              <div class="search-result-item" data-id="${product.id}">
                <img src="${product.thumbnail}" alt="${product.title}" />
                <span>${product.title}</span>
              </div>
            `
          )
          .join("")
      : "<div class='no-results'>No products found</div>";

    resultsDropdown.style.display = "block";

    const resultItems = document.getElementsByClassName("search-result-item");
    Array.from(resultItems).forEach((item) => {
      item.addEventListener("click", () => {
        router.navigate(`/products/${item.dataset.id}`);
      });
    });
  };

  searchInput.addEventListener("input", debounce(handleSearch, 300));
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim() !== "") {
      resultsDropdown.style.display = "block";
    }
  });
  searchInput.addEventListener("blur", () => {
    if (!resultsDropdown.matches(":hover")) {
      resultsDropdown.style.display = "none";
    }
  });
};

const homePageHandler = (products, categorizedProducts, featuredProducts) => {
  if (!Array.isArray(categorizedProducts)) {
    console.error("Categorized products is not an array");
    return;
  }

  if (!Array.isArray(featuredProducts)) {
    console.error("Featured products is not an array");
    return;
  }

  sliderHandler(featuredProducts, true);
  sortHandler(categorizedProducts);
  searchHandler(products);

  const productCards = document.getElementsByClassName("product-card");

  Array.from(productCards).forEach((card) => {
    card.addEventListener("click", () => {
      router.navigate(`/products/${card.dataset.id}`);
    });
  });
};

export default homePageHandler;
export { getFeaturedProducts, getCategorizedProducts };
