import "./RegisterPage.css";
import { router } from "../main";

export default function RegisterPage() {
  if (localStorage.getItem("loginData")) {
    router.navigate("/");
  }

  return `
    <form action="" id="register-form">
      <h1>Register</h1>
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

      <button type="submit" id="register-btn">Register</button>
      <a href="/login">Login</a>
    </form>
  `;
}
