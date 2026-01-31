import { Link, useNavigate } from "react-router";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { TextInput } from "../components";
import appApi from "../api/api";

import "../styles/login.css";
import {
  clearError,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../store/auth/authSlice";
import { useEffect } from "react";
import { Alert } from "@mui/material";
// import logo from "../assets/panaderia.png";

interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  return (
    <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <span className="company__logo">
            <h2>
              <span className="fa fa-android"></span>
            </h2>
          </span>
          <h4 className="company_title">Panadería San Cipriano</h4>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div className="container-fluid">
            <div className="row">
              <h2>Iniciar sesión</h2>
            </div>
            <div className="row">
              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                  try {
                    dispatch(loginStart());

                    // Petición al backend
                    const { data } = await appApi.post("/auth/login", {
                      username: values.username,
                      password: values.password,
                    });

                    localStorage.setItem("token", data.token);

                    dispatch(
                      loginSuccess({ user: data.user, token: data.token }),
                    );
                  } catch (error: any) {
                    dispatch(
                      loginFailure(
                        error.response?.data?.msg ||
                          "Credenciales invalidas o error en el servidor",
                      ),
                    );
                  }
                }}
                validationSchema={Yup.object({
                  username: Yup.string().required("Ingresa el usuario"),

                  password: Yup.string()
                    .min(6, "Debe ser minimo 6 caracteres")
                    .required("Ingresa la contraseña"),
                })}
              >
                {({}) => (
                  <Form className="form-group">
                    <TextInput
                      label="Usuario"
                      name="username"
                      type="text"
                      placeholder="Usuario"
                      className="form__input"
                    />
                    <TextInput
                      label="Contraseña"
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                      className="form__input"
                    />
                    <div className="row row-btn">
                      <button type="submit" disabled={loading} className="btn">
                        {loading ? "Cargando..." : "Ingresar"}
                      </button>
                      {/* <input type="submit" value="Ingresar" className="btn" /> */}
                    </div>

                    {error && (
                      <div className="row mt-2">
                        <Alert
                          sx={{ mb: 2 }}
                          severity="error"
                          onClose={() => dispatch(clearError())}
                        >
                          {error}
                        </Alert>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
            <div className="row row-link">
              <Link to="/forgot">¿Olvidaste tu contraseña?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
