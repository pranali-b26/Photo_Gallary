import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";

function Favourite() {
  const [favorites, setFavorites] = useState([]);

  // 🔥 LIVE SYNC FIX (important)
  useEffect(() => {
    const loadFav = () => {
      const saved = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(saved);
    };

    loadFav();

    // update when storage changes (dashboard like click)
    window.addEventListener("storage", loadFav);

    return () => window.removeEventListener("storage", loadFav);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <h2>❤️ Favourite Images</h2>

        {favorites.length === 0 ? (
          <p>No images found</p>
        ) : (
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 260px))",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  }}
>
  {favorites.map((img) => (
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
      <img
        src={img.src}
        alt={img.title}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "10px", textAlign: "center" }}>
        <h4>{img.name || img.title}</h4>
      </div>
    </div>
  ))}
</div>
        )}
      </div>
    </div>
  );
}

export default Favourite;