import { Link } from "react-router";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../components";

import "../styles/login.css";
// import logo from "../assets/panaderia.png";

export const LoginPage = () => {
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
                initialValues={{
                  username: "",
                  password: "",
                }}
                onSubmit={(values) => {
                  console.log(values);
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
                      <input type="submit" value="Ingresar" className="btn" />
                    </div>
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
