import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Category() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("photoGalleryData");
    setImages(saved ? JSON.parse(saved) : []);
  }, []);

  const grouped = (images || []).reduce((acc, img) => {
    if (!img) return acc;

    const cat = img.category || "Uncategorized";

    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(img);

    return acc;
  }, {});

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "20px" }}>
          <h2>📂 Categories</h2>

          {images.length === 0 ? (
            <p>No images uploaded 😕</p>
          ) : (
            Object.keys(grouped).map((cat) => (
              <div key={cat} style={{ marginBottom: "25px" }}>
                <h3>📁 {cat}</h3>

                <div className="gallery-grid">
                  {grouped[cat].map((img) => (
                    <div key={img.id} className="gallery-card">
                      <div className="img-box">
                        <img src={img.src} alt={img.name} />
                      </div>

                      <div className="card-info">
                        <p>{img.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;