import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import Spinner from './spinner/Spinner';

const Login = ({ setActiveUser, history, activeUser }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setActiveUser(true);
      history.push('/');
    }
  }, [activeUser, setActiveUser, history]);

  const iniciarSesion = () => {
    setLoading(true);
    setTimeout(() => {
      
      axios
        .post('http://challenge-react.alkemy.org/', {
          email: 'challenge@alkemy.org',
          password: 'react',
        })
        .then((res) => {
          const token = res.data.token;
          history.push('/');

          localStorage.setItem('token', token);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  };

  return (
    <div className="mt-5">
      <h3 className="text-center">Iniciar Sesion</h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          {loading ? (
            <div className="w-100 d-flex mt-4 justify-content-center">
              {' '}
              <Spinner />
            </div>
          ) : (
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Escribi tu email';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Error! direccion incorrecta';
                }
                if (!values.password) {
                  errors.password = 'Escribi tu contraseña';
                } else if (values.password.length < 3) {
                  errors.password = 'Debe tener mas de 3 caracteres';
                } else if (values.password === values.password.toLowerCase()) {
                  errors.password = 'Debe incluir letra Mayuscula';
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                iniciarSesion();

                setTimeout(() => {
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    className="form-control mb-2"
                    type="email"
                    name="email"
                    placeholder="Ingrese su email"
                  />
                  <ErrorMessage
                    className="mb-2 p-2 text-center fw-bold bg-danger "
                    name="email"
                    component="p"
                  />
                  <Field
                    className="form-control mb-2"
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                  />
                  <ErrorMessage
                    className="mb-2 p-2 text-center fw-bold bg-danger"
                    name="password"
                    component="div"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-dark btn-lg w-100"
                  >
                    INICIAR SESION
                  </button>
                </Form>
              )}
            </Formik>
          )}
          <hr />

          <p>Or Login With </p>
            <span>
              <FaFacebook className="fa-facebook"/>
            </span>
  
            <span>
              <FcGoogle className="fa-google"/>
            </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
