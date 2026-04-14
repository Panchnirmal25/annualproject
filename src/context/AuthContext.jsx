import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const navigate = useNavigate();
  const { setThemeByRole } = useTheme();

  // Apply theme when user is loaded from localStorage
  useEffect(() => {
    if (user) {
      setThemeByRole(user.role);
    }
  }, [user, setThemeByRole]);

  const login = (role, email) => {
    const userData = { role, email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Apply theme based on user role
    setThemeByRole(role);
    
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
