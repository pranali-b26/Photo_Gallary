import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";

function About() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
            ℹ️ About Us
          </h1>

          {/* MAIN CARD */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            }}
          >
            {/* HEADER SECTION */}
            <h2 style={{ marginBottom: "10px" }}>
              📸 Photography Dashboard System
            </h2>
            <p style={{ color: "#555", marginBottom: "20px" }}>
              A modern web application to manage images, profiles and settings in one place.
            </p>

            {/* GRID SECTIONS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "15px",
              }}
            >
              {/* OBJECTIVE */}
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "12px",
                }}
              >
                <h3>🎯 Objective</h3>
                <p>
                  To simplify image management and provide a clean dashboard system.
                </p>
              </div>

              {/* FEATURES */}
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "12px",
                }}
              >
                <h3>⚙️ Features</h3>
                <ul>
                  <li>Image Upload</li>
                  <li>Gallery View</li>
                  <li>Dark Mode</li>
                  <li>Settings Panel</li>
                </ul>
              </div>

              {/* TECH STACK */}
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "12px",
                }}
              >
                <h3>🛠️ Tech Stack</h3>
                <ul>
                  <li>React.js</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                  <li>LocalStorage</li>
                </ul>
              </div>

              {/* DEVELOPER */}
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "12px",
                }}
              >
                <h3>👩‍💻 Developer</h3>
                <p>Pranali Barsagade</p>
                <p>Frontend Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;