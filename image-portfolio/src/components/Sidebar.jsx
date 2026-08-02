import { NavLink } from "react-router-dom";
import "../css/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>📸 PhotoGallery Professional Collection</h2>

      <nav className="menu">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/upload">Upload</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>

        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;