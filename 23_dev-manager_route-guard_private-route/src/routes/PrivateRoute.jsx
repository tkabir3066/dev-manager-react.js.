import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  //logic
  const { user } = useContext(AuthContext);

  const loadedComponent = user ? children : <Navigate to="/login" />;
  return <>{loadedComponent}</>;
}

export default PrivateRoute;
