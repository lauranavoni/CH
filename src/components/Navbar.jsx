import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const Navbar = (props) => {
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    props.setActiveUser(false);
    props.history.push('/login');
  };

  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Arma tu equipo
        </Link>
        <div>
          <div className="d-flex">
            {props.activeUser ? (
              <NavLink className="btn btn-dark mx-2" to="/" exact>
                Home
              </NavLink>
            ) : null}

            {props.activeUser ? (
              <button className="btn btn-dark" onClick={cerrarSesion}>
                Salir
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
