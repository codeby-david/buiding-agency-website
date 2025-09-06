import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    //  Call backend: send reset email
    setMsg("Reset code sent to your email.");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        <p className="subtitle">Enter your email to reset</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">Send Reset Code</button>
        </form>

        {msg && <div className="success-msg">{msg}</div>}

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
