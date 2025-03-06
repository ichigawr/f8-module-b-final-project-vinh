import "./style.css";
import Navigo from "navigo";
import Header from "./layouts/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  loginPageHandler,
  registerPageHandler,
} from "./handlers/authPageHandler";
import productPageHandler from "./handlers/productPageHandler";
import { get } from "./api/api";

localStorage.cart ??= JSON.stringify([]);

const app = document.getElementById("app");
export const router = new Navigo("/", { linksSelector: "a" });

document.getElementById("header").innerHTML = Header();

const render = async (content, handler = null, ...params) => {
  app.innerHTML = content(...params);
  handler && handler(...params);
};

router
  .on({
    "/": () => render(HomePage),
    "/login": () => render(LoginPage, loginPageHandler),
    "/register": () => render(RegisterPage, registerPageHandler),
    "products/:id": async ({ data }) => {
      const product = await get(`products/${data.id}`);
      render(ProductPage, productPageHandler, product);
    },
  })
  .notFound(() => render(NotFoundPage()));

router.resolve();
