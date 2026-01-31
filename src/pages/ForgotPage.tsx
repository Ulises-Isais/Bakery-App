import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { TextInput } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { changePassword, resetPasswordState } from "../store/auth/forgotSlice";

export const ForgotPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useAppSelector((state) => state.forgot);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetPasswordState());
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate]);

  return (
    <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <span className="company__logo">
            <h2>
              <span className="fa fa-android"></span>
            </h2>
          </span>
          <h4 className="company_title">logo</h4>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div className="container-fluid">
            <div className="row">
              <h2>Recuperar contraseña</h2>
            </div>
            <div className="row">
              <Formik
                initialValues={{
                  username: "",
                  password1: "",
                  password2: "",
                }}
                onSubmit={async (values) => {
                  dispatch(
                    changePassword({
                      username: values.username,
                      password: values.password1,
                    }),
                  );
                }}
                validationSchema={Yup.object({
                  username: Yup.string().required("Ingresa el usuario"),

                  password1: Yup.string()
                    .min(6, "Debe ser minimo 6 caracteres")
                    .required("Ingresa la contraseña"),

                  password2: Yup.string()
                    .oneOf(
                      [Yup.ref("password1")],
                      "Las contraseñas no coinciden",
                    )
                    .required("Ingresa la contraseña"),
                })}
              >
                {({}) => (
                  <Form className="form-group">
                    <TextInput
                      label="username"
                      name="username"
                      type="text"
                      className="form__input"
                      placeholder="Usuario"
                    />
                    <TextInput
                      label="password1"
                      name="password1"
                      type="password"
                      className="form__input"
                      placeholder="Contraseña"
                    />
                    <TextInput
                      label="password2"
                      name="password2"
                      type="password"
                      className="form__input"
                      placeholder="Confirmar contraseña"
                    />
                    <div className="row row-btn">
                      <button type="submit" disabled={loading} className="btn">
                        {loading ? "Cambiando..." : "Cambiar contraseña"}
                      </button>
                    </div>
                    {success && (
                      <p className="text-success">
                        Contraseña cambiada correctamente
                      </p>
                    )}
                    {error && <p className="text-danger"> {error}</p>}
                  </Form>
                )}
              </Formik>
            </div>
            <div className="row row-link">
              <Link to="/login">Iniciar sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
