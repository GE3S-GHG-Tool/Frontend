import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getUser } from "../api/user";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken && storedToken !== "undefined" ? storedToken : null;
  });
  
  const [user, setUser] = useState({});
  const [table, setTable] = useState([]);

  const getInitialScope2Data = () => {
    const storedData = localStorage.getItem("scope2Data");
    return storedData
      ? JSON.parse(storedData)
      : {
        electricity: "",
        water: "",
        heat: "",
        desalinated: "",
      };
  };

  const [scope2Data, setScope2Data] = useState(getInitialScope2Data);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      getUserData();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const getUserData = async () => {
    const user = await getUser();
    setUser(user?.data);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
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
    setScope2Data,
    scope2Data,
    setToken,
    getUserData
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
