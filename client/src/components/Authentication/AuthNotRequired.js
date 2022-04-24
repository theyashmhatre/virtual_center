import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts";

const AuthNotRequired = ({children}) => {
  const context = useContext(AuthContext);

  if (!context.checkAuth()) return children;
  else return <Navigate to="/main" />;
}

export default AuthNotRequired;
