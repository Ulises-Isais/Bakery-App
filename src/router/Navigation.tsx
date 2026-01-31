import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import {
  LoginPage,
  ForgotPage,
  DashboardPage,
  InventoryPage,
  SalesPage,
  GraphicsPage,
} from "../pages";
import { PrivateRoute } from "../components";
import { useInitAuth } from "../hooks/useInitAuth";

export const Navigation = () => {
  useInitAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot" element={<ForgotPage />} />

        {/* Rutas privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <InventoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <SalesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="graphics"
          element={
            <PrivateRoute>
              <GraphicsPage />
            </PrivateRoute>
          }
        />

        {/* Ruta por defecto */}
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
