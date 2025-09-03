import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard-page">
      <div className="dashboard-box">
        <h2>Welcome, {user?.name || "User"} 🎉</h2>

        <div className="dashboard-actions">
          <button className="btn-primary">My Bookings</button>
          {user?.role === "admin" && (
            <button className="btn-secondary">All Bookings</button>
          )}
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
