import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../utilities/api/user";

const AuthRequired = ({children}) => {
  const isUserLoggedIn = isLoggedIn()

  if (isUserLoggedIn) return children;
  else return <Navigate to="/login" />;
}

export default AuthRequired;
