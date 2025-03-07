import "./LoginPage.css";
import { router } from "../main";

function LoginPage() {
  if (localStorage.getItem("loginData")) {
    router.navigate("/");
  }

  return `
    <form action="" id="login-form">
      <h1>Login</h1>
      <div>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          autocomplete="on"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          autocomplete="on"
        />
      </div>

      <button type="submit" id="login-btn">Login</button>
      <a href="/register">Register</a>
    </form>
  `;
}

export default LoginPage;
