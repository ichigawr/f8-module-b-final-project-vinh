import "./header.css";

function renderHeader() {
  document.getElementById("header").innerHTML = `
    <a href="/" class="logo"><i class="fa-brands fa-square-xing"></i></a>
    <nav>
      <ul>
        <li>
          <a href="/cart">
            <i class="fa-solid fa-cart-shopping"></i>
            <span id="cart-count"
              >${(() => {
                try {
                  return JSON.parse(localStorage.cart).length;
                } catch (error) {
                  console.error(error);
                  return 0;
                }
              })()}</span
            >
          </a>
        </li>
        ${
          localStorage.getItem("loginData")
            ? `
              <li>
                <button
                  id="logout-btn"
                  style="padding: 4px 8px; background-color: darkcyan; color: white"
                >
                  Logout
                </button>
              </li>
              <li><i class="fa-solid fa-user" style="color: white"></i></li>
            `
            : `
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            `
        }
      </ul>
    </nav>
  `;

  if (localStorage.getItem("loginData")) {
    const logoutButton = document.getElementById("logout-btn");
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loginData");
      renderHeader();
    });
  }
}

export default renderHeader;
