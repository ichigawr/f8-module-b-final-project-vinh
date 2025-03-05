import { router } from "../main";

export default function RegisterPage() {
  // if (localStorage.getItem("loginData")) {
  //   router.navigate("/");
  // }

  return `
    <form action="" id="register-form">
      <h1>Register</h1>
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
        <button type="submit" class="btn btn-primary w-100">Register</button>
      </div>

      <a href="/login">Login</a>
    </form>
  `;
}
