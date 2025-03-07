import "./Slider.css";

function Slider(images, alt = "") {
  if (!images || images.length === 0) {
    console.error("No images found.");
    return "";
  }

  return `
    <div class="slider">
      <img src="${images[0]}" alt="${alt}" />
      ${
        images.length > 1
          ? `<button class="prev-btn">
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button class="next-btn">
              <i class="fa-solid fa-angle-right"></i>
            </button>`
          : ""
      }
    </div>
  `;
}

export default Slider;
