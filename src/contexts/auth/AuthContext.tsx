import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface AuthContextProps {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("userToken"));
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const login = (newToken: string) => {
    localStorage.setItem("userToken", newToken);
    setToken(newToken);
    navigate("/home");  
  };

 
  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};