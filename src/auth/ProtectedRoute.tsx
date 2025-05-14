import { Navigate } from "react-router-dom";
import { childredProps } from "../types/types";

const ProtectedRoute = ({ children }: childredProps) => {
  if (!localStorage.getItem("userFirstName")) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoute;
