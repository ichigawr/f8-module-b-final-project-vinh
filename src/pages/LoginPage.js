import { router } from "../main";

function LoginPage() {
  // if (localStorage.getItem("loginData")) {
  //   router.navigate("/");
  // }

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
