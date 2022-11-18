import User from "../models/UserModel.js";

// verifica si esa iniciada sesion
export const verifyUser = async(req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg:"Porfavor inicie sesion"});
    }
    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Correo no existe no existe"});
    req.userId = user.id;
    req.role = user.role;
    next();
}

// verisifica si el user es admin
export const adminOnly = async(req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Correo no existe no existe"});
    if(user.role !== 1) return res.status(403).json({msg: "Acceso solo administrador"});
    next();
}