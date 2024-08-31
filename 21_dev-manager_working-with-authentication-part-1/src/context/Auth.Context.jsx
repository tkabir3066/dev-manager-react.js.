import { createContext, useState } from "react";
import { axiosPublicInstance } from "../config/axios";
import { toast } from "react-toastify";

//create context
export const AuthContext = createContext();

//create a provider

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const registerUser = async (data) => {
    try {
      const response = await axiosPublicInstance.post(
        "/api/auth/local/register",
        data
      );

      const { user, jwt } = response.data;

      //setting data to the local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));

      //update state
      setUser(user);
      setToken(jwt);

      toast.success("Registration successful");
    } catch (err) {
      toast.error(err.response.data.error.message);
    }
  };
  const login = (data) => {};
  const logout = () => {};
  const val = {
    user,
    token,
    registerUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};
