import { check } from "express-validator";

export const validatoruser=

    [
        check('correo','el correo es incorrecto..!!').isEmail(),
        check ('correo ','el nombre es requerido y maximo de  50 caracteres').isLength({max:50}).notEmpty(),
        check('rol', 'rol incorrecto').isIn([, 'administrador', 'usuario'])
        
        ];
    
    