import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { Navigate, useLocation } from "react-router-dom";
function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const loadedComponent = user ? (
    <Navigate
      to={location?.state?.from ? location?.state?.from : "/contacts"}
    />
  ) : (
    children
  );
  return <>{loadedComponent}</>;
}

export default PublicRoute;
