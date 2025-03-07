import Toastify from "toastify-js";
import renderHeader from "../layouts/Header";
import { post } from "../api/api";
import { router } from "../main";

const showNotification = (message, ...colors) => {
  if (!message || typeof message !== "string" || message.trim() === "") {
    console.error("Message must be a non-empty string");
    return;
  }

  if (!Array.isArray(colors) || colors.length === 0) {
    colors = ["#00b09b", "#96c93d"];
    console.warn("Invalid colors provided, using default gradient");
  }

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    stopOnFocus: true,
    style: {
      position: "absolute",
      right: "10px",
      marginTop: "60px",
      background: `linear-gradient(to right, ${colors.join(",")})`,
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "16px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
  }).showToast();
};

const isInfoValid = (userInfo) => {
  userInfo.email = userInfo.email.trim();

  if (userInfo.email === "") {
    showNotification("Email is required.", "#d44336", "#d32f2f");
    return false;
  }

  if (userInfo.password.length < 6) {
    showNotification(
      "Password must be at least 6 characters.",
      "#d44336",
      "#d32f2f"
    );
    return false;
  }

  return true;
};

const loginPageHandler = async () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const userInfo = Object.fromEntries(formData);

    if (!isInfoValid(userInfo)) return;

    const data = await post(userInfo, "login");

    if (data.accessToken) {
      showNotification("Login successful!", "#4caf50", "#2e7d32");
      localStorage.setItem("loginData", JSON.stringify(data));
      renderHeader();
      router.navigate("/");
    } else {
      showNotification("Invalid email or password.", "#d44336", "#d32f2f");
      loginForm.reset();
    }
  });
};

const registerPageHandler = async () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const userInfo = Object.fromEntries(formData);

    if (!isInfoValid(userInfo)) return;

    const data = await post(userInfo, "register");

    if (data.accessToken) {
      showNotification("Registration successful.", "#4caf50", "#2e7d32");
      router.navigate("/login");
    } else {
      showNotification("Email already exists.", "#d44336", "#d32f2f");
      registerForm.reset();
    }
  });
};

export { loginPageHandler, registerPageHandler };
