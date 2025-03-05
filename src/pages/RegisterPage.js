import { router } from "../main";
import { post } from "../api/auth";

export default function RegisterPage() {
  if (localStorage.getItem("loginData")) {
    router.navigate("/");
  }

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
