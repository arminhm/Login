import React , { useEffect } from 'react';
import Layout from './Layout';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {getMe} from "../features/authSlice";




const Users = () => {

  // user solo para admini
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
    if(user && user.role !== 1){
      navigate("/dashboard");
    }
  },[isError, user , navigate]);
  return (
    <Layout>
        
    </Layout>
    )
}

export default Users