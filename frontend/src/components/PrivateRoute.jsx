import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.users.user);
  const token = useSelector((state) => state.users.token);

  const storedUser = localStorage.getItem("user");

  if (!user && !token && !storedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;