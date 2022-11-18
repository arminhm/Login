// creacion de controlador Login() inicio de sesion | Me()  obtiene sesion iniciada | LogOut() cierra sesion
import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async(req, res) => {
    const user = await User.findOne({
        where: {
            id: req.body.id
        }
    });
    if(!user) return res.status(404).json({msg: "Rut inexistente"});
    // compara la variable password ingresada enscriptada con argon2
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg:"Contrasenia incorrecta"});
    req.session.userId = user.id;
    const id = user.id;
    const role = user.role;
    const name = user.name;
    const email = user.email;   
    const telefono = user.telefono;
    
    res.status(200).json({id,role , name, email, telefono});
}

export const Me = async(req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg:"Porfavor inicie sesion"});
    }
    const user = await User.findOne({
        attributes: ['id', 'role', 'name',  'email', 'telefono'],
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Rut inexistente"});
    res.status(200).json(user);
}



export const LogOut = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg:"Error en cerrar sesion"});
        res.status(200).json({msg:"Sesion cerrada"});
    });
}
