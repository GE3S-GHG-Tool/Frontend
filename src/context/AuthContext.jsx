import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getUser } from "../api/user";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    // Update authentication state when token changes
    if (token) {
      getUSerData();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const getUSerData = async () => {
    const user = await getUser();
    // console.log(user?.data);
    setUser(user?.data);
  };
  useEffect(() => {
    // Set up an event listener to catch changes to localStorage
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
