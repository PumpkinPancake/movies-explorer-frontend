import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ component: Component, loggedIn, ...props }) {
  return loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
}
