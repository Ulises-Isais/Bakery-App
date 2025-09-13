import { Navigate } from "react-router";
import { useAppSelector } from "../hooks/hooks";
import type { JSX } from "react";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
