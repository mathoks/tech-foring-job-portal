import axios from "axios";
import { createContext, useContext, useMemo, useState } from "react";
import { redirect, } from "react-router-dom";

// import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
   

  // call this function when you want to authenticate the user
  const login = async (data) => {
  const userData = await  axios.post("http://localhost:4000/api/v1/auth/login", data, {withCredentials: true}).then((res) => {
      console.log(res.data.data.username);
      return res.data.data.username;
    });
    setUser(userData);
  };

  const addUser = async (data) => {
    const userData = await  axios.post("http://localhost:4000/api/v1/users/create-user", data, {withCredentials: true}).then((res) => {
        console.log(res.data.newUser.username);
        return res.data.newUser.username;
      });
      setUser(userData);
    };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    redirect("/", { replace: true });
  };

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/auth/check-islogIn", {
        withCredentials: true,
      });
  
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const value = useMemo(
    () => ({
      user,
      addUser,
      login,
      logout,
      getUser,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};