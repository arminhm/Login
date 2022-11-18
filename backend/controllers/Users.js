import Users from "../models/UserModel.js";
import argon2 from "argon2";


// obtiene todos los usuarios
export const getUsers = async(req, res) =>{
    try {
        const response = await Users.findAll({
            attributes:['id','role' ,'name','email', 'telefono']
        });
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json({msg: error.message});
        
    }

}
// obtiene informacion de un ususario por su uuid 
export const getUserId = async (req, res) =>{
    try {
        const response = await Users.findOne({
            attributes:['id','name','rut' ,'email','role'],
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json({msg: error.message});
        
    }

    
}
// crea nuevo ususario e encripta la contraseña 
export const createUser = async(req, res) =>{
    const {id ,name, email, password, confPassword, role , telefono} = req.body;    
    if(password !== confPassword) return res.status(400).json({msg:"Contasenia no coincide"});
    const hashPassword = await argon2.hash(password);

    //insertar en la bd
    try {
        await Users.create({
            id: id,
            role : role,
            name: name,
            password: hashPassword,
            email: email,
            telefono: telefono
        })
        res.status(201).json({msg: "Usuario creado"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
// acutaliza usuarios requeriendo su uuid
export const updateUser = async(req, res) =>{ 
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User no existe"});
    const {id, name,role, email, password, confPassword, telefono} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg:"Contrasenia no coincide"});
    try {
        await Users.update({
            id: id,
            name: name,
            role: role,
            email: email,
            telefono: telefono,
            password: hashPassword
            
        },{
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: "Usuario actualizado"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteUser = async(req, res) =>{
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User no existe"});
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: "Usuario eliminado"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

    
}
