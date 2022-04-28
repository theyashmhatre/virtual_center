import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts";

const AuthRequired = ({ children, role }) => {
  const context = useContext(AuthContext);
  
  if (context.checkAuth())
    if (context.auth.role == "super_admin") return children;
    else if (context.auth.role == role) return children;
    else if (context.auth.role == "admin" && role == "employee") return children;
    else return <Navigate to="/main" />;
  else return <Navigate to="/login" />;
}

export default AuthRequired;
