import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

const AuthContext = React.createContext(null);

export const useAuth = () => {
  return React.useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = React.useState(null);

  const fakeAuth = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve("2342f2f1d131rf12"), 250);
    });

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider