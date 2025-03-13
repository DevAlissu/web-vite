// import { useAuth } from "../contexts/auth/AuthContext";
import { ReactNode } from "react";
// import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { token } = useAuth();

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  return children; // 🔹 Agora sempre permite o acesso
};

export default ProtectedRoute;