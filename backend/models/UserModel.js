import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true
            // no nullo / no vacio
        }
    },
    role:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: false,
            len: [3, 100]
            // 3 - 100 caracteres
        }      
       },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }      
       },
    telefono:{
        type: DataTypes.INTEGER,
        allowNull: false

    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }      
       },       
},{
    freezeTableName: true
});

export default Users;