import { useState } from "react";
import axios from "axios";
import "./style.css";

const API_BASE = (import.meta.env.VITE_AUTH_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

function Login({ onLogin, onRegister }) {
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
      setError("Invalid email or password ❌");
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
      </div>
    </div>
  );
}

export default Login;


// import { useState } from "react";
// import axios from "axios";
// import "./style.css";

// function Login({ onLogin, onRegister }) {
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         form
//       );

//       if (res.data && res.data.token) {

//         // ✅ SAVE AUTH DATA
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));

//         setMessage("Login Successful ✅");

//         // ✅ DIRECT NAVIGATION (NO DELAY NEEDED)
//         onLogin();

//       } else {
//         setError("Invalid email or password ❌");
//       }

//     } catch (err) {
//       setError("Invalid email or password ❌");
//     }
//   };

//   return (
//     <div className="bg">
//       <div className="card">
//         <h1>🌾 AgriVision</h1>
//         <h3>Login</h3>

//         <form onSubmit={handleSubmit}>
//           <input
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">Login</button>
//         </form>

//         {/* SUCCESS */}
//         {message && (
//           <p style={{ color: "green", marginTop: "10px" }}>
//             {message}
//           </p>
//         )}

//         {/* ERROR */}
//         {error && (
//           <p style={{ color: "red", marginTop: "10px" }}>
//             {error}
//           </p>
//         )}

//         <p>
//           New user?{" "}
//           <span onClick={onRegister} style={{ cursor: "pointer" }}>
//             Register
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
