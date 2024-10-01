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
  const [table, setTable] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    // Update authentication state when token changes
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);
  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const getUserData = async () => {
    const user = await getUser();
    console.log("user:", user?.data);
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
    setTable,
    table,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
