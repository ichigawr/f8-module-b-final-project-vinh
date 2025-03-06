import { router } from "../main";

const sliderHandler = (images, autoSlide = false) => {
  if (!images || images.length === 0) {
    console.error("No images found.");
    return;
  }

  if (images.length <= 1) return;

  const slider = document.querySelector(".slider");
  const img = slider.querySelector("img");
  const prevBtn = slider.querySelector(".prev-btn");
  const nextBtn = slider.querySelector(".next-btn");
  let index = 0;
  let autoSlideInterval = null;

  const startAutoSlide = () => {
    if (autoSlide) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => nextBtn.click(), 3000);
    }
  };

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    img.src = images[index];
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    img.src = images[index];
    startAutoSlide();
  });

  startAutoSlide();

  router.hooks({
    before(done) {
      clearInterval(autoSlideInterval);
      done();
    },
  });
};

export default sliderHandler;
