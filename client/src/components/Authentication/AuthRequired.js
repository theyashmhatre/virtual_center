import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { roleIds } from "../../../constants";
import { AuthContext } from "../../contexts";

const AuthRequired = ({ children, role }) => {
  const context = useContext(AuthContext);
  
  if (context.checkAuth())
    if (context.auth.role == roleIds["super_admin"]) return children;
    else if (context.auth.role == role) return children;
    else if (context.auth.role == roleIds["admin"] && role == roleIds["user"]) return children;
    else return <Navigate to="/main" />;
  else return <Navigate to="/login" />;
}

export default AuthRequired;
