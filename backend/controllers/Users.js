import Users from "../models/UserModel.js";
import argon2 from "argon2";



export const getUsers = async(req, res) =>{
    try {
        const response = await Users.findAll({
            attributes:['uuid','name','email','role']
        });
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json({msg: error.message});
        
    }

}

export const getUserId = async (req, res) =>{
    try {
        const response = await Users.findOne({
            attributes:['uuid','name','email','role'],
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json({msg: error.message});
        
    }

    
}

export const createUser = async(req, res) =>{
    const {name, email, password, confPassword, role} = req.body;    
    if(password !== confPassword) return res.status(400).json({msg:"Contasenia no coincide"});
    const hashPassword = await argon2.hash(password);

    //insertar en la bd
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role : role
        })
        res.status(201).json({msg: "Usuario creado"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateUser = async(req, res) =>{ 
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User no existe"});
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg:"Contrasenia no coincide"});
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role : role
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
            uuid: req.params.id
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