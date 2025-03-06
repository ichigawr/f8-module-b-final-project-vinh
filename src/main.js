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

const app = document.getElementById("app");
export const router = new Navigo("/", { linksSelector: "a" });

document.getElementById("header").innerHTML = Header();

const render = async (content, beforeHandler = null, afterHandler = null, ...params) => {
  beforeHandler && beforeHandler(...params);
  app.innerHTML = content(...params);
  afterHandler && afterHandler(...params);
};

router
  .on({
    "/": () => render(HomePage),
    "/login": () => render(LoginPage, null, loginPageHandler),
    "/register": () => render(RegisterPage, null, registerPageHandler),
    "products/:id": async ({ data }) => {
      const product = await get(`products/${data.id}`);
      render(ProductPage, null, productPageHandler, product);
    },
  })
  .notFound(() => render(NotFoundPage()));

router.resolve();
