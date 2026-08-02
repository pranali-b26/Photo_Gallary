import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/settings.css";

function Settings() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [language, setLanguage] = useState("English");

  useEffect(() => {

    const savedDark =
      JSON.parse(localStorage.getItem("darkMode"));

    const savedNotification =
      JSON.parse(localStorage.getItem("notifications"));

    const savedPrivate =
      JSON.parse(localStorage.getItem("privateAccount"));

    const savedLanguage =
      localStorage.getItem("language");

    if (savedDark !== null)
      setDarkMode(savedDark);

    if (savedNotification !== null)
      setNotifications(savedNotification);

    if (savedPrivate !== null)
      setPrivateAccount(savedPrivate);

    if (savedLanguage)
      setLanguage(savedLanguage);

  }, []);

  const saveSettings = () => {

    // SAVE SETTINGS
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

    localStorage.setItem(
      "privateAccount",
      JSON.stringify(privateAccount)
    );

    localStorage.setItem(
      "language",
      language
    );

    // 🌙 APPLY DARK MODE TO FULL APP
    const currentTheme = darkMode ? "dark" : "light";

    document.documentElement.setAttribute(
      "data-theme",
      currentTheme
    );

    localStorage.setItem(
      "theme",
      currentTheme
    );

    alert("Settings Saved Successfully ✅");
  };

  const logout = () => {

    if (window.confirm("Do you want to Logout?")) {

      localStorage.removeItem("isLoggedIn");

      alert("Logged Out Successfully ✅");

      window.location.href = "/login";

    }

  };

  return (

    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="settings-card">

          <h1>⚙ Settings</h1>

          {/* DARK MODE */}
          <div className="setting-box">

            <h3>🌙 Dark Mode</h3>

            <label className="switch">

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() =>
                  setDarkMode(!darkMode)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

          {/* NOTIFICATIONS */}
          <div className="setting-box">

            <h3>🔔 Notifications</h3>

            <label className="switch">

              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

          {/* PRIVATE ACCOUNT */}
          <div className="setting-box">

            <h3>🔒 Private Account</h3>

            <label className="switch">

              <input
                type="checkbox"
                checked={privateAccount}
                onChange={() =>
                  setPrivateAccount(!privateAccount)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

          {/* LANGUAGE */}
          <div className="setting-box">

            <h3>🌐 Language</h3>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >

              <option>English</option>
              <option>Hindi</option>

            </select>

          </div>

          {/* BUTTONS */}
          <div className="button-group">

            <button
              className="save-btn"
              onClick={saveSettings}
            >
              💾 Save Settings
            </button>

            <button
              className="logout-btn"
              onClick={logout}
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Settings;