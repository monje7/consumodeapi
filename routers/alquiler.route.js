import {Router} from 'express';

import{ actualizaralquiler, eliminaralquiler, listaralquiler, registraralquiler } from '../controllers/alquiler.controller.js';
import{validarToken} from '../controllers/autenticacion.contollers.js';


const alquilerRoute=Router();

alquilerRoute.get('/listar',listaralquiler);
alquilerRoute.post('/registro',validarToken,registraralquiler);
alquilerRoute.put('/actualizar/:id',validarToken,actualizaralquiler);
alquilerRoute.delete('/eliminar/:id',validarToken,eliminaralquiler);



export default alquilerRoute;