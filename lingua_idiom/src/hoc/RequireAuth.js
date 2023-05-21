import React, { Component } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = (children) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!auth) {
    return <Navigate to="/pages/loginpage" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
