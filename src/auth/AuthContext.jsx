import { createContext, useState } from "react";
import { getUser } from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from token in localStorage so refresh works
  const [user, setUser] = useState(() => getUser());

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};