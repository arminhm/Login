import React , { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate , NavLink } from 'react-router-dom';
import {getMe} from "../features/authSlice";
import '../style.css';


const Estudiante = () => {  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError , user} = useSelector((state => state.auth));
  
    useEffect(()=>{
      dispatch(getMe());
    },[dispatch]);
    useEffect(()=>{
      if(isError){
        navigate("/") 
      } 
      if(user && user.role !== 5){
        navigate("/estudiante");
      }
    },[isError, user , navigate]);



  return (
    <div>
      <h1 className='enproceso'> Vista en proceso </h1>
      <NavLink to="/dashboard"> Volver </NavLink>



    </div>
  )
}

export default Estudiante