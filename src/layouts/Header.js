import './header.css';

function Header() {
  return `
    <a href="/" class="logo">Logo</a>
    <nav>
      <ul>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </nav>
  `;
}

export default Header;
