import React from "react";
import { Route, Navigate } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem("authToken");

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
}
