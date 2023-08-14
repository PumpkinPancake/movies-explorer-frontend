import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ component: Component, ...props }) {
  console.log("Проверка loggedIn в ProtectedRoute:", props.loggedIn);
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
}
