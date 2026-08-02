import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";

import profileImg from "../assets/Pranali.png.jpeg";

function Profile() {

  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    name: "Pranali Barsagade",
    email: "pranali@example.com",
    phone: "+91 XXXXXXXXXX",
    location: "Maharashtra, India",
    bio: "CSE Student • Photography Enthusiast"
  });

  const [uploadedCount, setUploadedCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const [profilePic, setProfilePic] = useState(profileImg);

  // ✅ LIVE SYNC (updates every 1 sec)
  useEffect(() => {

    const interval = setInterval(() => {

      const uploaded = JSON.parse(localStorage.getItem("uploadedImages")) || [];
      const favorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];

      setUploadedCount(uploaded.length);
      setFavoriteCount(favorites.length);

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  // Load saved profile
  useEffect(() => {
    const saved = localStorage.getItem("profile");
    const savedPic = localStorage.getItem("profilePic");

    if (saved) setUser(JSON.parse(saved));
    if (savedPic) setProfilePic(savedPic);
  }, []);

  // Save profile
  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(user));
    setEdit(false);
    alert("Profile Updated Successfully ✅");
  };

  // 📸 Camera / Upload Profile Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <h1 style={{ textAlign: "center" }}>
          👤 My Profile
        </h1>

        {/* PROFILE IMAGE SECTION */}
        <div style={{ textAlign: "center", position: "relative", width: "170px", margin: "auto" }}>

          <img
            src={profilePic}
            alt="Profile"
            style={{
              width: "170px",
              height: "170px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #4f46e5"
            }}
          />

          {/* 📸 CAMERA ICON */}
          <label
            htmlFor="profileUpload"
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              background: "#4f46e5",
              color: "white",
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            📸
          </label>

          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

        </div>

        <div
          style={{
            background: "var(--card-bg)",
            maxWidth: "650px",
            margin: "30px auto",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        >

          <br />

          {edit ? (
            <>
              <input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />

              <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />

              <input
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                placeholder="Phone"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />

              <input
                value={user.location}
                onChange={(e) => setUser({ ...user, location: e.target.value })}
                placeholder="Location"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />

              <textarea
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                rows="3"
                style={{ width: "100%", padding: "10px" }}
              />
            </>
          ) : (
            <div style={{ lineHeight: "35px" }}>

              <h2 style={{ textAlign: "center" }}>{user.name}</h2>
              <p style={{ textAlign: "center" }}>{user.bio}</p>

              <hr />

              <p><strong>📧 Email:</strong> {user.email}</p>
              <p><strong>📱 Phone:</strong> {user.phone}</p>
              <p><strong>📍 Location:</strong> {user.location}</p>

              <p><strong>📷 Uploaded Images:</strong> {uploadedCount}</p>
              <p><strong>❤️ Favorite Images:</strong> {favoriteCount}</p>

            </div>
          )}

          <div style={{ marginTop: "20px", textAlign: "center" }}>

            {edit ? (
              <button
                onClick={saveProfile}
                style={{
                  padding: "10px 25px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#16a34a",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                💾 Save Profile
              </button>
            ) : (
              <button
                onClick={() => setEdit(true)}
                style={{
                  padding: "10px 25px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#4f46e5",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                ✏️ Edit Profile
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;