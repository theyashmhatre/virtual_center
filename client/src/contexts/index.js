import jwt from 'jsonwebtoken';
import { createContext, useState } from 'react';

export const AuthContext = createContext({});

let initialAuthState
try {
  initialAuthState = jwt.decode(sessionStorage.getItem('Access Token'))
} catch {
  initialAuthState = {}
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthState);

  const storeAuth = (token) => {
    sessionStorage.setItem('Access Token', token);
    setAuth(jwt.decode(token));
  };

  const checkAuth = () => {
    if (auth) {
      const expiryDateTime = new Date(auth.exp * 1000);
      const currentDateTime = new Date();

      if (expiryDateTime > currentDateTime)
        return true;
    }

    sessionStorage.removeItem("Access Token");
    setAuth(null);
    return false;
  };

  const context = {
    auth: auth,
    storeAuth: storeAuth,
    checkAuth: checkAuth,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
