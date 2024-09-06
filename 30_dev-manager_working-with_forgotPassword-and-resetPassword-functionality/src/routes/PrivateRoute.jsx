import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  //logic
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const loadedComponent = user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
  return <>{loadedComponent}</>;
}

export default PrivateRoute;
