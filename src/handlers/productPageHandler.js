const productPageHandler = ({ images }) => {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const img = document.querySelector(".product__left-content img");
  let index = 0;

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    img.src = images[index];
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    img.src = images[index];
  });
};

export default productPageHandler;
