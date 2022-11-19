import React, { useState, useEffect } from "react";
// hook useState  (guardar estado de componentes), useEffect (desencadena acciones dependiendo de cambios de estados)
import { useDispatch, useSelector } from "react-redux";
// useDispatch consume la funcion creada 
// leer estado 
import { useNavigate } from "react-router-dom";
// navegar entre rutas
import { LoginUser, reset } from "../features/authSlice";
// funciones importadas de authSlice
import '../style.css';



const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && isSuccess && user.role === 5) {
      navigate("/estudiante");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    //  preventDefault para que la pagina no recargue cuando envia datos del formulario 
    dispatch(LoginUser({ id, password }));
  };

  return (
    <section className="hero is-fullheight is-fullwidth ">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                {isError && <p className="has-text-centered">{message}</p>}
                <h1 className="title is-2">Inicio de Sesion</h1>
                <div className="field">
                  <label className="label">Rut</label>
                  <div className="control"> 
                    <input
                      type="text"
                      className="input"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      placeholder="Rut"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Contraseña</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;