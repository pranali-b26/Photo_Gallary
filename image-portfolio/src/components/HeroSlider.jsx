import { useState, useEffect } from "react";
import "../css/HeroSlider.css";

const images = [
  "https://picsum.photos/id/1018/1200/400",
  "https://picsum.photos/id/1015/1200/400",
  "https://picsum.photos/id/1025/1200/400"
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="hero-slider">

      <img src={images[current]} alt="Slider" />

      <button
        className="slider-arrow left"
        onClick={prevSlide}
      >
        ❮
      </button>

      <button
        className="slider-arrow right"
        onClick={nextSlide}
      >
        ❯
      </button>

      <div className="hero-slider-content">
        <h2>Nature's Beauty</h2>
        <p>Explore premium photography collection.</p>
      </div>

    </div>
  );
}

export default HeroSlider;