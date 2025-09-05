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
      setError("");

      const isEmail = form.emailOrPhone.includes("@");

      const requestData = { password: form.password };
      if (isEmail) {
        requestData.email = form.emailOrPhone.toLowerCase().trim();
      } else {
        requestData.phone = form.emailOrPhone.trim().replace(/\D/g, "");
      }

      const res = await axios.post("http://localhost:5000/api/auth/login", requestData);

      if (res.data.token && res.data.user) {
        // ✅ Save token and ONLY user object
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.user.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid email/phone or password.");
        } else if (err.response.status === 404) {
          setError("Login endpoint not found.");
        } else if (err.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(err.response.data?.message || "Login failed.");
        }
      } else if (err.request) {
        setError("Cannot connect to server. Please check if backend is running.");
      } else {
        setError("Login failed. Please try again.");
      }
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
              autoComplete="email"
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
              autoComplete="current-password"
            />
          </div>

          {error && <div className="field-error">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="or">OR</div>

        <GoogleLogin
          onSuccess={(res) => {
            console.log("Google login success", res);
            navigate("/");
          }}
          onError={() => setError("Google login failed")}
        />

        <div className="auth-links">
          <Link to="/register">Don't have an account? Register</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}
