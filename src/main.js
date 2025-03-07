import "./style.css";
import Navigo from "navigo";
import Header from "./layouts/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  loginPageHandler,
  registerPageHandler,
} from "./handlers/authPageHandler";
import homePageHandler, {
  getFeaturedProducts,
  getCategorizedProducts,
} from "./handlers/homePageHandler";
import productPageHandler from "./handlers/productPageHandler";
import cartPageHandler from "./handlers/cartPageHandler";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import { get } from "./api/api";

localStorage.cart ??= JSON.stringify([]);

const app = document.getElementById("app");
const router = new Navigo("/", { linksSelector: "a" });

document.getElementById("header").innerHTML = Header();

const render = (content, handler = null, ...args) => {
  app.innerHTML = content(...args);
  handler && handler(...args);
};

router
  .on({
    "/": async () => {
      const products = await get("products");
      const categorizedProducts = getCategorizedProducts(products);
      const featuredProducts = getFeaturedProducts(products);
      render(HomePage, homePageHandler, products, categorizedProducts, featuredProducts);
    },
    "/login": () => render(LoginPage, loginPageHandler),
    "/register": () => render(RegisterPage, registerPageHandler),
    "/products/:id": async ({ data }) => {
      const product = await get(`products/${data.id}`);
      render(ProductPage, productPageHandler, product);
    },
    "/cart": () => {
      try {
        const cart = JSON.parse(localStorage.cart);
        render(CartPage, cartPageHandler, cart);
      } catch (error) {
        console.error(error);
      }
    },
    "/checkout-success": () =>
      render(CheckoutSuccessPage, () => {
        setTimeout(() => router.navigate("/"), 10000);
      }),
  })
  .notFound(() => render(NotFoundPage));

router.resolve();

export { render, router };
