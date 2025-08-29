import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { LoginPage, ForgotPage, DashboardPage } from "../pages";

export const Navigation = () => {
  return (
    <BrowserRouter>
      <div className="main-layout">
        {/* <nav>
          <img src={logo} alt="React Logo" />
          <ul>
            <li>
              <NavLink
                to="/despachom"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Despacho mañana Page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/formik-basic"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik Basic
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/formik-yup"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik YUP
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/formik-comp"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik Components
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/formik-abstract"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik Abstractaction
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot" element={<ForgotPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
