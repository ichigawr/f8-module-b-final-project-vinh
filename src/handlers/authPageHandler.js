import renderHeader from "../layouts/Header";
import { post } from "../api";
import { router } from "../main";
import { showNotification } from "../utils";

const isValidPage = (page) => {
  if (typeof page !== "string" || !["login", "register"].includes(page)) {
    console.error("Invalid page");
    return false;
  }

  return true;
};

const isValidInfo = (userInfo) => {
  userInfo.email = userInfo.email.trim();

  if (userInfo.email === "") {
    showNotification("Email is required.", "error");
    return false;
  }

  if (userInfo.password.length < 6) {
    showNotification("Password must be at least 6 characters.", "error");
    return false;
  }

  return true;
};

const authPageHandler = async (page = "login") => {
  if (!isValidPage(page)) return;

  const authForm = document.getElementById("auth-form");
  const remember = document.getElementById("remember");

  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(authForm);
    const userInfo = Object.fromEntries(formData);

    if (!isValidInfo(userInfo)) return;

    let data = await post(userInfo, page);

    if (data.accessToken) {
      const message =
        page === "login"
          ? "Signed in successfully!"
          : "Account created successfully! You are now signed in.";
      showNotification(message, "success");

      if (remember.checked) {
        localStorage.setItem("loginData", JSON.stringify(data));
      } else {
        sessionStorage.setItem("loginData", JSON.stringify(data));
      }

      renderHeader();
      router.navigate("/");
    } else {
      const message =
        page === "login"
          ? "Invalid email or password."
          : "Email already exists.";
      showNotification(message, "error");
      authForm.reset();
    }
  });
};

export default authPageHandler;
export { isValidPage };
