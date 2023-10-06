import {Router} from 'express';

import{buscarUsuario, listarUsuario, guardarUsuario, elimanarUsuario,
actualizarUsuario } from '../controllers/usuario.controller.js';

import{validarToken} from '../controllers/autenticacion.contollers.js';

import { validatoruser } from "../validator/usuario.validator.js";



const usuarioRoute=Router();




usuarioRoute.get('/listar',listarUsuario);

usuarioRoute.get('/buscar/:id',buscarUsuario);

usuarioRoute.post('/registrar',validatoruser,validarToken,guardarUsuario);

usuarioRoute.delete('/eliminar/:id',validarToken,elimanarUsuario);

usuarioRoute.put('/actualizar/:id',validarToken,actualizarUsuario);

export default usuarioRoute;