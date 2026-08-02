import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [messages, setMessages] = useState([]);

  // Load saved messages
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("messages"));
    if (saved) {
      setMessages(saved);
    }
  }, []);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit message
  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      id: Date.now(),
      ...form,
    };

    const updatedMessages = [newMessage, ...messages];

    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            📞 Contact Us
          </h1>

          {/* TOP INFO CARD */}
          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <h3>💬 We are here to help you!</h3>
            <p>Feel free to send your message anytime.</p>
          </div>

          {/* FORM CARD */}
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              marginBottom: "25px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                style={inputStyle}
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                style={inputStyle}
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                style={inputStyle}
              />

              <button style={buttonStyle} type="submit">
                🚀 Send Message
              </button>
            </form>
          </div>

          {/* MESSAGE LIST */}
          <h3 style={{ marginBottom: "10px" }}>📩 Messages</h3>

          {messages.length === 0 ? (
            <p>No messages yet</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} style={messageCard}>
                <h4>{msg.name}</h4>
                <p style={{ fontSize: "14px", color: "gray" }}>
                  {msg.email}
                </p>
                <p>{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const messageCard = {
  background: "#f8f9fa",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "10px",
};

export default Contact;