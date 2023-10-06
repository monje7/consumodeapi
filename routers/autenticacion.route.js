import {Router} from 'express';
import { validarUsuario } from '../controllers/autenticacion.contollers.js';


const autRoute=Router();

autRoute.post('/validar',validarUsuario);

export default autRoute;