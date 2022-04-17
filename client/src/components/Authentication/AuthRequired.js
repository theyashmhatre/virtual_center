import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts";

const AuthRequired = ({children}) => {
  const context = useContext(AuthContext);

  if (context.checkAuth()) return children;
  else return <Navigate to="/login" />;
}

export default AuthRequired;
