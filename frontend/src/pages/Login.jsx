import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.emailOrPhone || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/users/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // save token
        localStorage.setItem("user", JSON.stringify(res.data.user)); // save user info

        // ✅ Redirect based on role
        if (res.data.user.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FaEnvelope className="icon" />
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Phone"
              value={form.emailOrPhone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {error && <div className="field-error">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="or">OR</div>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={(res) => {
            console.log("Google login success", res);
            // ⚡ You can also check role here after verifying on backend
            navigate("/");
          }}
          onError={() => setError("Google login failed")}
        />

        <div className="auth-links">
          <Link to="/register">Don’t have an account? Register</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}
