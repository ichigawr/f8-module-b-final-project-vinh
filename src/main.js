import "./style.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

const app = document.getElementById("app");
const router = new Navigo("/", { linksSelector: "a" });

const render = (content) => {
  app.innerHTML = content();
};

router
  .on({
    "/": () => render(HomePage),
    "/login": () => render(LoginPage),
    "/register": () => render(RegisterPage),
  })
  .notFound(() => render(NotFoundPage));

router.resolve();

export { router };
