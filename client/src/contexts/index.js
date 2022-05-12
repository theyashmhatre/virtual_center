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
  const [showMessages, setShowMessages] = useState(false);
  const [messageUserId, setMessageUserId] = useState();
  const [unReadConversations, setUnReadConversations] = useState(0);

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

  const removeAuth = () => {
    sessionStorage.removeItem('Access Token');
    setAuth(null);
  };

  const context = {
    auth: auth,
    storeAuth: storeAuth,
    checkAuth: checkAuth,
    removeAuth: removeAuth,
    showMessages: showMessages,
    setShowMessages: setShowMessages,
    messageUserId: messageUserId,
    setMessageUserId: setMessageUserId,
    unReadConversations: unReadConversations,
    setUnReadConversations: setUnReadConversations,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
