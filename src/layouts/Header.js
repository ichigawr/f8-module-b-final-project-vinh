import "./header.css";

function Header() {
  return `
    <a href="/" class="logo">Logo</a>
    <nav>
      <ul>
        <li>
          <a href="/cart">
            <i class="fa-solid fa-cart-shopping"></i>
            <span id="cart-count">${(() => {
              try {
                return JSON.parse(localStorage.cart).length;
              } catch (error) {
                console.error(error);
                return 0;
              }
            })()}</span>
          </a>
        </li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </nav>
  `;
}

export default Header;
