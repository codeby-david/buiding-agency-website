import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function ResetPassword() {
  const [form, setForm] = useState({ code: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔗 Call backend with reset code + new password
    setMsg("✅ Password reset successful. Redirecting...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Reset Password</h2>
        <p className="subtitle">Enter the code and your new password</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FaLock className="icon" />
            <input
              type="text"
              placeholder="Reset Code"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
          </div>

          <div className="form-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="New Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary">Reset Password</button>
        </form>

        {msg && <div className="success-msg">{msg}</div>}

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
