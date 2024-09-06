import { createContext, useState } from "react";
import { axiosPublicInstance } from "../config/axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

//create context
export const AuthContext = createContext();

const loadedUser = JSON.parse(localStorage.getItem("user"));
const loadedToken = JSON.parse(localStorage.getItem("token"));
//create a provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadedUser ? loadedUser : null);
  const [token, setToken] = useState(loadedToken ? loadedToken : null);

  const location = useLocation();
  const navigate = useNavigate();
  const registerUser = async (data) => {
    try {
      const response = await axiosPublicInstance.post(
        "/auth/local/register",
        data
      );

      const { user, jwt } = response.data;

      //setting data to the local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));

      //update state
      setUser(user);
      setToken(jwt);

      //showing flash message
      toast.success("Registration successful");

      //redirecting the user
      navigate("/contacts");
    } catch (err) {
      toast.error(err.response.data.error.message);
    }
  };
  const login = async (data) => {
    try {
      const response = await axiosPublicInstance.post("/auth/local", data);

      const { user, jwt } = response.data;

      //setting data to the local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));

      //update state
      setUser(user);
      setToken(jwt);

      //showing flash message
      toast.success("Logged in successfully");

      //redirecting the user
      navigate(location?.state?.from ? location?.state?.from : "/contacts");
    } catch (err) {
      toast.error(err.response.data.error.message);
    }
  };
  const logout = () => {
    // remove data from localStorage

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    //remove data from state
    setUser(null);
    setToken(null);
    //showing flash message
    toast.success("Logged out successfully");

    navigate("/");
  };
  const val = {
    user,
    token,
    registerUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};
