import { useState, useContext, createContext, useLayoutEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setLoading(true);
    const user = localStorage.getItem("auth");
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
