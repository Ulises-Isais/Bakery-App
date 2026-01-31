import { Navigate } from "react-router";
import { useAppSelector } from "../hooks/hooks";
import type { JSX } from "react";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, initialized } = useAppSelector(
    (state) => state.auth,
  );

  if (!initialized) return <div>Cargando sesión...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
