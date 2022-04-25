import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts";

const AdminAuthRequired = ({children}) => {
  const context = useContext(AuthContext);

  if (context.checkAuth())
    if (context.auth.role == "admin") return children;
    else return <Navigate to="/main" />;
  else return <Navigate to="/login" />;
}

export default AdminAuthRequired;
