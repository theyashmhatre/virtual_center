import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../utilities/api/user";

const AuthNotRequired = ({children}) => {
  const isUserLoggedIn = isLoggedIn()

  if (!isUserLoggedIn) return children;
  else return <Navigate to="/" />;
}

export default AuthNotRequired;
