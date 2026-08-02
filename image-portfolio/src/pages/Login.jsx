import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter Email and Password");
      return;
    }

    // Temporary Login
    localStorage.setItem("isLoggedIn", "true");

    alert("Login Successful ✅");

    // Reload and open Dashboard
    window.location.href = "/";
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>📸 Photo Gallery</h1>

        <h2>Login</h2>

        <form onSubmit={loginUser}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;