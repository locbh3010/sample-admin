import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../configs/firebase-configs";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
  }, []);
  return (
    <AuthContext.Provider value={value} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("Phải sử dụng context trong provider");

  return context;
}

export { AuthProvider, useAuth };
