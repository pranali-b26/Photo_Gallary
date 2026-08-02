import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";

import "../css/dashboard.css";

const categories = [
  "All",
  "Nature",
  "Wedding",
  "Portrait",
  "Wildlife",
  "Fashion",
   
  "Urban"
];

const images = [
  { id: 1, src: "https://picsum.photos/id/1018/400/500", title: "Nature View", category: "Nature" },
  { id: 2, src: "https://picsum.photos/id/1025/400/600", title: "Wedding Moment", category: "Wedding" },
  { id: 3, src: "https://picsum.photos/id/1003/400/450", title: "Wildlife Shot", category: "Wildlife" },
  { id: 4, src: "https://picsum.photos/id/1011/400/550", title: "Fashion Style", category: "Fashion" },
  { id: 5, src: "https://picsum.photos/id/1040/400/650", title: "Urban Life", category: "Urban" },
  { id: 6, src: "https://picsum.photos/id/1005/400/480", title: "Portrait Art", category: "Portrait" }
];

function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // ❤️ FAVORITE FIX (IMPORTANT)
  const toggleFavorite = (img) => {
  const saved = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = saved.find((item) => item.id === img.id);

  let updated;

  if (exists) {
    updated = saved.filter((item) => item.id !== img.id);
  } else {
    updated = [...saved, img];
  }

  localStorage.setItem("favorites", JSON.stringify(updated));
  setFavorites(updated);
};

  const downloadImage = (img) => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = img.title;
    link.click();
  };

  const filteredImages = images.filter((img) => {
    return (
      (activeCategory === "All" || img.category === activeCategory) &&
      img.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />
        <HeroSlider />

        {/* SEARCH */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* CATEGORY */}
        <div className="category-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className="category-btn"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GALLERY */}
        <div className="gallery">
          {filteredImages.map((img) => (
            <div className="image-card" key={img.id}>
              <img
                src={img.src}
                alt={img.title}
                onClick={() => setSelectedImage(img)}
              />

              <div className="overlay">
                <h4>{img.title}</h4>
                <p>{img.category}</p>

                <div className="actions">
                  <span
                    onClick={() => toggleFavorite(img)}
                    style={{
                      cursor: "pointer",
                      color: favorites.find((f) => f.id === img.id)
                        ? "red"
                        : "white"
                    }}
                  >
                    ❤️
                  </span>

                  <span onClick={() => downloadImage(img)}>⬇️</span>
                  <span onClick={() => setSelectedImage(img)}>🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX */}
        {selectedImage && (
          <div className="lightbox" onClick={() => setSelectedImage(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.title} />
              <h3>{selectedImage.title}</h3>

              <button onClick={() => setSelectedImage(null)}>✖</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;