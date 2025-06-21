import React, { createContext, useContext, useState } from "react";
import axios from "../api/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    return token ? { token, username, role } : null;
  });

  const login = async (credentials) => {
    const res = await axios.post("/auth/login", credentials);
    const { username, role, token } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setUser({ username, role, token });
  };

  const register = async (credentials) => {
    const res = await axios.post("/auth/register", credentials);
    const { username, role, token } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setUser({ username, role, token });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
