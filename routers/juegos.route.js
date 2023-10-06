import {Router} from 'express';

import{buscarjuegos, listarjuegos,guardarjuegos, eliminarjuegos, actualizarjuegos, cargarImagen} from '../controllers/juegos.controller.js';

import{validarToken} from '../controllers/autenticacion.contollers.js';
const juegosRoute=Router();

juegosRoute.get('/listar',validarToken,listarjuegos);

juegosRoute.get('/buscar/:id',buscarjuegos);

juegosRoute.post('/registrar',validarToken,cargarImagen,guardarjuegos);

juegosRoute.delete('/eliminar/:id',validarToken,eliminarjuegos);

juegosRoute.put('/actualizar/:id',validarToken,cargarImagen,actualizarjuegos);

export default juegosRoute;