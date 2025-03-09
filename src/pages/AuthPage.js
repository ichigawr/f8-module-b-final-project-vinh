import { isValidPage } from "../handlers/authPageHandler";
import { router } from "../main";
import "./AuthPage.css";

function AuthPage(page = "login") {
  if (!isValidPage(page)) return;

  if (localStorage.getItem("loginData")) {
    router.navigate("/");
  }

  const pageText = page === "login" ? "Sign In" : "Sign Up";

  return `
    <form action="" id="auth-form">
      <h1>${pageText}</h1>
      <div class="input-form">
        <label for="email">Email</label>
        <div class="input-wrapper">
          <i class="fas fa-at"></i>
          <input
            page="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            autocomplete="on"
          />
        </div>
      </div>
      <div class="input-form">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <i class="fas fa-lock"></i>
          <input
            page="password"
            name="password"
            id="password"
            placeholder="Enter your password (min. 6 characters)"
            autocomplete="on"
          />
        </div>
      </div>

      ${
        page === "login"
          ? `
            <label for="remember">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                value="true"
              />
              <span class="custom-checkbox"></span>
              <span>Remember me</span>
            </label>
          `
          : ""
      }

      <button type="submit">${pageText}</button>
      <div class="auth-link">
        ${
          page === "login"
            ? `<p>Don't have an account? <a href="/register">Sign Up</a></p>`
            : `<p>Already have an account? <a href="/login">Sign In</a></p>`
        }
      </div>
    </form>
  `;
}

export default AuthPage;
