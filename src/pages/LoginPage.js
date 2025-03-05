import { router } from "../main";
import { post } from "../api/auth";

function LoginPage() {
  if (localStorage.getItem("loginData")) {
    router.navigate("/");
  }

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

  return `
    <form action="" id="login-form">
      <h1>Login</h1>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-control"
          autocomplete="on"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="form-control"
          autocomplete="on"
        />
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </div>

      <a href="/register">Register</a>
    </form>
  `;
}

export default LoginPage;
