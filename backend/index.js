import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js"
import db from "./config/Database.js"

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

/* crear modelo de db en mysql
(async()=>{
    await db.sync();
})();
*/

// secure: false/true : http/https



app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json())

app.use(UserRoute);
app.use(AuthRoute);

// store.sync(); hace sessions

app.listen(process.env.APP_PORT, ()=> {
    console.log('API levantada exitosamente y corriendo');
}); 