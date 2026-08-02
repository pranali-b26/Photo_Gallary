import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Upload() {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("General");
  const [selectedImg, setSelectedImg] = useState(null);

  // Load images
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("photoGalleryData")) || [];
    setImages(saved);
  }, []);

  // Save helper
  const saveToStorage = (data) => {
    localStorage.setItem("photoGalleryData", JSON.stringify(data));
  };

  // Convert file → Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Upload image
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file);

    const newImage = {
      id: Date.now(),
      src: base64,
      name: file.name,
      category: category,
      likes: 0,
    };

    const updated = [newImage, ...images];
    setImages(updated);
    saveToStorage(updated);

    e.target.value = "";
  };

  // Delete image
  const deleteImage = (id) => {
    const updated = images.filter((img) => img.id !== id);
    setImages(updated);
    saveToStorage(updated);
  };

  // Like image
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
};

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1 style={{ textAlign: "center" }}>📤 Upload Images</h1>

          <p style={{ textAlign: "center", color: "gray" }}>
            Upload, like and preview your images
          </p>

          {/* UPLOAD BOX */}
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <option value="General">General</option>
              <option value="Nature">Nature</option>
              <option value="Wedding">Wedding</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
            </select>

            <br />

            {/* FILE INPUT */}
            <input type="file" onChange={handleUpload} />

            <p style={{ marginTop: "10px", color: "gray" }}>
              Select image to upload
            </p>
          </div>

          {/* COUNT */}
          <h3 style={{ marginTop: "20px" }}>
            🖼 Total Images: {images.length}
          </h3>

          {/* GRID */}
          {images.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No images uploaded yet
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(260px, 260px))",
                justifyContent: "center",
                gap: "20px",
                marginTop: "15px",
              }}
            >
              {images.map((img) => (
                <div
                  key={img.id}
                  style={{
                    width: "260px",
                    background: "#fff",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* IMAGE */}
                  <div
                    style={{ height: "220px", cursor: "pointer" }}
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

                  {/* INFO */}
                  <div style={{ padding: "10px", textAlign: "center" }}>
                    <p style={{ fontSize: "12px" }}>{img.name}</p>

                    <p style={{ fontSize: "11px", color: "gray" }}>
                      {img.category}
                    </p>

                    {/* BUTTONS */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "8px",
                      }}
                    >
                      {/* LIKE */}
                      <button
                        onClick={() => likeImage(img.id)}
                        style={{
                          padding: "5px 8px",
                          fontSize: "12px",
                          border: "none",
                          background: "#ff4d6d",
                          color: "#fff",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        ❤️ {img.likes || 0}
                      </button>

                      {/* VIEW */}
                      <button
                        onClick={() => setSelectedImg(img)}
                        style={{
                          padding: "5px 8px",
                          fontSize: "12px",
                          border: "none",
                          background: "#333",
                          color: "#fff",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        🔍 View
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteImage(img.id)}
                        style={{
                          padding: "5px 8px",
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
          )}

          {/* ZOOM MODAL */}
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
                alignItems: "center",
                justifyContent: "center",
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
    </div>
  );
}

export default Upload;