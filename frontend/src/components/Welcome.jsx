import React from 'react'
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state)=> state.auth);
  return (
    <div>
        <h2 className='subtitle'> Bienvenido denuevooo... <strong> {user && user.name }</strong> </h2>
    </div>
  )
}

export default Welcome  