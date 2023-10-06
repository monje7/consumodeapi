
import { pool} from "../database/conexion.js";



export const listarUsuario=async (req,res)=>{
try{
const [result]=await pool.query(`select * from usuarios`);
res.status(200).json(result);
}catch(err){
    res.status(500).json({
        massage:'error en listarUsuario :'+err})
}

};

export const buscarUsuario=async (req,res)=>{

    try{

        let id=req.params.id;

    const [result]=await pool.query('select * from usuarios where idusuario=' +id);
    res.status(200).json(result[0]);
    }catch(err){
        res.status(500).json({
            massage:'error en listarUsuario :'+err})
    }
    
    };

export const guardarUsuario=async (req,res)=>{
try{
let error=validationResult(req,);
if(!error.isEmpty()){
    res.status(401).json(error);
}


let {nombres,direccion,telefono,correo,rol,password}=req.body;

let sql=`insert into usuarios (nombres,direccion,telefono,correo,rol,password)
            values('${nombres}','${direccion}','${telefono}','${correo}','${rol}','${password}')`;


       const[rows] = await pool.query(sql);
    if(rows.affectedRows > 0){
        res.status(200).json({"status":200,"message":"se registro con exito"});
    }
    else{
        res.status(401).json({"status":401, "message":"no se registro ERROR"});

    }
}catch (e) {
    res.status(500).json({"status":500,"message":"Error en el servidor: " +e});
}
};

 
export const elimanarUsuario = async (req,res)=>{
   try{
    let id = req.params.id;

   let sql = `delete from usuarios where idusuario=${id}`;

   const[rows] = await pool.query(sql)
   if(rows.affectedRows>0){
    return  res.status(200).json({"status":200,"message":"se elimino el usuario con exito..."});

   }else{

   return res.status(401).json({"status":401,"message":"no se ilimino el usuario"});
   
   }


}catch (e) {
   return res.status(500).json({"status":500,"message":"error en el servidor "+e});
} 
    
};


 export const actualizarUsuario = async (req,res)=>{
    try{
        let id =req.params.id;
        let{nombres,direccion,telefono,correo,rol}=req.body;

    let sql=`update usuarios SET nombres='${nombres}',direccion='${direccion}',telefono='${telefono}',correo='${correo}',rol='${rol}' where idusuario=${id}`;
   const[rows] = await pool.query(sql);
   if(rows.affectedRows>0){

    res.status(200).json({"status":200,"message":"se actualizo"});

   }else{

     res.status(401).json({"status":401,"message":"no se actualizo"});

   }
   
 }catch(e){

    res.status(500).json({"status":500,"message":"error en el servidor:"+e });
 }

 };
