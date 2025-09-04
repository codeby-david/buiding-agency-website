// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

// Create context
export const AuthContext = createContext();

// Create provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simulate login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Restore user if exists
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
