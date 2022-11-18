// barra de la izquierda

import React from 'react'
import {NavLink } from "react-router-dom";
import {IoPerson} from "react-icons/io5";
import { useSelector } from "react-redux";
// import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // toma informacion del auth y lo asigna  auser
  const {user} = useSelector((state)=> state.auth);

  // funcion para salir
  /* const logout = () =>{
    dispatch(LogOut());
    dispatch(reset());
    navigate("/") 
  } */

  return (
    <div>
        <aside className="menu pl-2 has-shadow">
  {/* condicional de estudiante y inicio de sesion */}
  {user && user.role === 5 && (
    <div>

      <p className="menu-label">
      Menu Estudiante
      </p>
      <ul className="menu-list">
      <li><NavLink to={"/estudiante"} > <IoPerson/> Ingresar Pregunta </NavLink></li>
      <li><NavLink to={"/estudiante"} > <IoPerson/> Ingresar Solicitud </NavLink></li>
      <li><NavLink to={"/estudiante"} > <IoPerson/> Ver preguntas frecuentes </NavLink></li>
      </ul>
      </div>
  )}
    {/* condicional de secretaria y inicio de sesion */}
    {user && user.role === 3 && (
    <div>

      <p className="menu-label">
      Menu Secretario
      </p>
      <ul className="menu-list">
      <li><NavLink to={"/estudiante"} > <IoPerson/> Responder pregunta </NavLink></li>
      </ul>
      </div>
  )}


    {/* condicional de estudiante y inicio de sesion */}
  {user && user.role === 2 && (
    <div>

      <p className="menu-label">
      Menu Jefe de carrera
      </p>
      <ul className="menu-list">
      <li><NavLink to={"/estudiante"} > <IoPerson/> Responder solicitud </NavLink></li>
      <li><NavLink to={"/estudiante"} > <IoPerson/> Responder preguntas </NavLink></li>
      <li><NavLink to={"/estudiante"} > <IoPerson/> Estadistica </NavLink></li>
      </ul>
      </div>
  )}


{user && user.role === 1 && (
    <div>

      <p className="menu-label">
      Menu del Administrador
      </p>
      <ul className="menu-list">
      <li><NavLink to={"/estudiante"} > <IoPerson/> Configuraciones </NavLink></li>
      </ul>
      </div>
  )}

  
  {/* condicional de profesor y inicio de sesion */}
  {user && user.role === 4 && (
    <div>

      <p className="menu-label">
      Menu Profesor
      </p>
      <ul className="menu-list">
      <li><NavLink to={"/estudiante"} > <IoPerson/> Responder pregunta </NavLink></li>
      </ul>
      </div>
  )}
  

</aside>


    </div>
  )
}

export default Sidebar