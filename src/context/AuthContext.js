import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { auth } from "../firebase";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const onauth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      onauth();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
