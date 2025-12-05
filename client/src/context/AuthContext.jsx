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
    console.log('Login called with:', email);
    const res = await loginUser({ email, password });
    console.log('Login response:', res);
    const userData = res.data; // res is {success, data:{token, user...}}
    console.log('User data:', userData);
    setToken(userData.token);
    setUser(userData);

    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log('Login complete, user set:', userData);
  };

  // REGISTER
  const register = async (username, email, password, role) => {
    console.log('Register called with:', { username, email, role });
    const res = await registerUser({ username, email, password, role });
    console.log('Register response:', res);
    const userData = res.data; // res is {success, data:{token, user...}}
    console.log('User data:', userData);
    setToken(userData.token);
    setUser(userData);

    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log('Registration complete, user set:', userData);
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
