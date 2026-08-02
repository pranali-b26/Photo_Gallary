import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signup.css";

function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const registerUser = async (e) => {
    e.preventDefault();

    // password check
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: user.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account Created Successfully ✅");
        navigate("/login");
      } else {
        alert(data.message || "Something went wrong ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-box">

        <h1>📸 Photo Gallery</h1>
        <h2>Create Account</h2>

        <form onSubmit={registerUser}>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="text"
            placeholder="Phone Number"
            required
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={user.confirmPassword}
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          />

          <button type="submit">
            Sign Up
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;