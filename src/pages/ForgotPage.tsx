import { Link } from "react-router";

export const ForgotPage = () => {
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
                    id="password1"
                    className="form__input"
                    placeholder="Contraseña"
                  />
                </div>
                <div className="row">
                  <input
                    type="password"
                    name="password"
                    id="password2"
                    className="form__input"
                    placeholder="Confirmar contraseña"
                  />
                </div>
                <div className="row row-btn">
                  <input
                    type="submit"
                    value="Cambiar contraseña"
                    className="btn"
                  />
                </div>
              </form>
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
