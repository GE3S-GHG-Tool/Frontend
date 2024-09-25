import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const localToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (localToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [localToken]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
