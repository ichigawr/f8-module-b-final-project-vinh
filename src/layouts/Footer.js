import "./Footer.css";

function renderFooter() {
  document.getElementById("footer").innerHTML = `
    <a href="/" class="logo"><i class="fa-brands fa-square-xing"></i></a>
    <div class="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </div>
    <div class="footer-social">
      <h4>Connect With Us</h4>
      <div class="social-icons">
        <a href="https://www.facebook.com/"><i class="fab fa-facebook"></i></a>
        <a href="https://x.com/"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="https://www.instagram.com/">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.youtube.com/"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
    <p>&copy; ${new Date().getFullYear()} Vinh. All Rights Reserved.</p>
  `;
}

export default renderFooter;
