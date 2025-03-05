import { post } from "../api/api";

const loginPageHandler = () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const userInfo = Object.fromEntries(formData);
    console.log(userInfo);

    userInfo.email = userInfo.email.trim();

    if (userInfo.email === "") {
      alert("Email is required.");
      return;
    }

    if (userInfo.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const data = await post(userInfo, "login");

    if (data.accessToken) {
      alert("Login successful!");
      console.log(data);
      localStorage.setItem("loginData", JSON.stringify(data));
      router.navigate("/");
    } else {
      alert(data.error || "Unexpected error occurred.");
      loginForm.reset();
    }
  });
};

const registerPageHandler = () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const userInfo = Object.fromEntries(formData);
    console.log(userInfo);

    if (userInfo.email === "") {
      alert("Email is required.");
      return;
    }

    if (userInfo.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const data = await post(userInfo, "register");

    if (data.accessToken) {
      if (confirm("Registration successful. Login now?")) {
        router.navigate("/login");
      }
    } else {
      alert(data.error || "Unexpected error occurred.");
      registerForm.reset();
    }
  });
};

export { loginPageHandler, registerPageHandler };
