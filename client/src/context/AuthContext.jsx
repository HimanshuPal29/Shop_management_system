// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // LOGIN
  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    setToken(res.data.token);
    setUser(res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  // REGISTER
  const register = async (username, email, password, role) => {
    const res = await registerUser({ username, email, password, role });
    setToken(res.data.token);
    setUser(res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  // LOGOUT
  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
