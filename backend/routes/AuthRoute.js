import express from "express";
import { Login , LogOut , Me} from "../controllers/Auth.js"

const router = express.Router();

// get : sacar recursos del back , post : guardar/crear recursos del back , put : modificar todo el recurso
// delete : elimina recrusos del back  , patch : modificar parte del recurso

// Me() ver sesion acutal | Login() iniciar sesion | LogOut() cerra sesion
router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', LogOut);




export default router;