// acceso a bd
import { Sequelize } from "sequelize";

const db = new Sequelize('saps','root', '',{
    host: "localhost",
    dialect: "mysql"
})

export default db;
