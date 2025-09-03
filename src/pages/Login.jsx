import React, { useState } from "react";
import { FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [error, setError] = useState("");
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
    // 🔗 Later: Call backend login API
    navigate("/dashboard");
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

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <div className="or">OR</div>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={(res) => {
            console.log("Google login success", res);
            navigate("/dashboard");
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
