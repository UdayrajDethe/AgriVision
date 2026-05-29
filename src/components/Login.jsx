import { useState } from "react";
import axios from "axios";
import "./style.css";

const API_BASE = (import.meta.env.VITE_AUTH_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:4000").replace(/\/$/, "");

function Login({ onLogin, onRegister, onBackToLanding }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // ✅ NEW STATES
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        form
      );

      if (res.data && res.data.token) {

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ SHOW SUCCESS MESSAGE
        setMessage("Login Successful ✅");

        // ⏳ WAIT 2 SECONDS THEN REDIRECT
        setTimeout(() => {
          onLogin();
        }, 1000);

      } else {
        setError("Invalid email or password ❌");
      }

    } catch (err) {
      setError(err.response?.data?.details || err.response?.data?.message || "Login failed. Please check the backend connection.");
    }
  };

  return (
    <div className="bg">
      <div className="card">
        <h1>🌾 AgriVision</h1>
        <h3>Login</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        {/* ✅ SUCCESS MESSAGE */}
        {message && (
          <p style={{ color: "green", marginTop: "10px" }}>
            {message}
          </p>
        )}

        {/* ❌ ERROR MESSAGE */}
        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <p>
          New user? <span onClick={onRegister}>Register</span>
        </p>
        <p>
          <span onClick={onBackToLanding}>Back to Home</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
