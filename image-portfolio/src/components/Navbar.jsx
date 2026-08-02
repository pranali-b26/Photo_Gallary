import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/Pranali.png.jpeg";

function Navbar() {

  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();

  useEffect(() => {

    const savedDark =
      JSON.parse(localStorage.getItem("darkMode"));

    const currentTheme =
      savedDark ? "dark" : "light";

    setTheme(currentTheme);

    document.documentElement.setAttribute(
      "data-theme",
      currentTheme
    );

  }, []);

  const toggleTheme = () => {

    const newTheme =
      theme === "light"
        ? "dark"
        : "light";

    setTheme(newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

    localStorage.setItem(
      "theme",
      newTheme
    );

    localStorage.setItem(
      "darkMode",
      JSON.stringify(newTheme === "dark")
    );

  };

  return (

    <div
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        background: "var(--navbar-bg)",
        color: "var(--text-color)"
      }}
    >

      <h2>📸 PhotoGallery</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}
      >

        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          {theme === "light"
            ? "🌙 Dark"
            : "☀️ Light"}
        </button>

        <img
          src={profile}
          alt="Profile"
          onClick={() => navigate("/profile")}
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
            cursor: "pointer",
            border: "2px solid #2563eb",
            boxShadow:
              "0 0 8px rgba(0,0,0,0.2)"
          }}
        />

      </div>

    </div>

  );

}

export default Navbar;