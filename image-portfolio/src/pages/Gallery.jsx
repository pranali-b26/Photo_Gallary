import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("photoGalleryData")) || [];
    setImages(saved);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("photoGalleryData", JSON.stringify(data));
  };

  const likeImage = (id) => {
  const updated = images.map((img) =>
    img.id === id
      ? { ...img, likes: (img.likes || 0) + 1 }
      : img
  );

  setImages(updated);
  saveToStorage(updated);

  const clickedImage = updated.find((img) => img.id === id);

  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.find((img) => img.id === id);

  if (!exists) {
    favorites.push(clickedImage);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }


    setImages(updated);
    saveToStorage(updated);
  };

  const deleteImage = (id) => {
    const updated = images.filter((img) => img.id !== id);
    setImages(updated);
    saveToStorage(updated);
  };

  const filteredImages = images.filter((img) => {
  const searchText = search.toLowerCase();

  return (
    (img.name || "").toLowerCase().includes(searchText) ||
    (img.category || "").toLowerCase().includes(searchText)
  );
});

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div style={{ padding: "20px" }}>

          <h2 style={{ marginBottom: "10px" }}>
            🖼 Gallery
          </h2>

          <input
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          />

          {/* GRID */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 260px))",
    justifyContent: "center",
    gap: "20px",
    marginTop: "15px",
  }}
>
            {filteredImages.map((img) => (
              <div
                key={img.id}
                style={{
                  width: "100%",
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <div
  style={{
    width: "260px",
    height: "220px",
    cursor: "pointer",
  }}

                  onClick={() => setSelectedImg(img)}
                >
                  <img
                    src={img.src}
                    alt={img.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => likeImage(img.id)}
                    style={{
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "5px 8px",
                      cursor: "pointer",
                    }}
                  >
                    ❤️ {img.likes || 0}
                  </button>
                </div>

                {/* FOOTER */}
                <div style={{ padding: "10px" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {img.name}
                  </p>

                  <p
                    style={{
                      fontSize: "11px",
                      color: "gray",
                    }}
                  >
                    {img.category}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "8px",
                    }}
                  >
                    <button
                      onClick={() => setSelectedImg(img)}
                      style={{
                        padding: "6px 10px",
                        fontSize: "12px",
                        border: "none",
                        background: "#333",
                        color: "#fff",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>

                    <button
                      onClick={() => deleteImage(img.id)}
                      style={{
                        padding: "6px 10px",
                        fontSize: "12px",
                        border: "none",
                        background: "red",
                        color: "#fff",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedImg && (
          <div
            onClick={() => setSelectedImg(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <img
              src={selectedImg.src}
              alt={selectedImg.name}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "10px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;