import { Link } from "react-router";
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
              <form className="form-group">
                <div className="row">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form__input"
                    placeholder="Usuario"
                  />
                </div>
                <div className="row">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form__input"
                    placeholder="Contraseña"
                  />
                </div>
                <div className="row row-btn">
                  <input type="submit" value="Ingresar" className="btn" />
                </div>
              </form>
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
