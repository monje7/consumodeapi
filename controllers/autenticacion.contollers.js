
import { pool } from '../database/conexion.js';

import jwt from 'jsonwebtoken';

export const validarUsuario = async (req, res) => {

    try {
        let { correo, password } = req.body;
        console.log(correo,password)
        let sql = `select idusuario,nombres,rol from usuarios where correo = '${correo}' and password ='${password}'`;
        const [rows] = await pool.query(sql);

        if (rows.length > 0) {
            let token=jwt.sign({user:rows},process.env.AUT_SECRET,{expiresIn:process.env.AUT_EXPIRE});
            



            res.status(200).json({token:token,message:'usuario autorizado'});
        } else {
            res.status(401).json({ message: 'usuario no encontrado...' });
        }


    } catch (e) {
        res.status(500).json({ message: 'error en el sistema' + e });
    }

}

export const validarToken=async(req,res,next)=>{
try{
    let token_usuario=req.headers['token'];
    if(!token_usuario){
        return res.status(401).json({message:'se requiere el token...'});
    }else{
        const decoded=jwt.verify(token_usuario,process.env.AUT_SECRET,(error,decoded)=>{
            if(error){
                return res.status(401).json({message:'token invalido....',
            autorizad:false});
            }else{
                next();
            }
        });
    }
}catch(e){
    return res.status(401).json ({message:'error en el servidor'+ e});
}

}

