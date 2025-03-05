function HomePage() {
  return `
    <h1>Home page</h1>
    <a href="/login" onclick="localStorage.removeItem('loginData')">Logout</a>
  `;
}

export default HomePage;
