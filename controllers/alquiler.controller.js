import { pool } from "../database/conexion.js";


export const registraralquiler = async (req, res) => {
  try {
    let { fecha_alquiler, fecha_devolucion, juego, usuario, cantidad, estado } = req.body;

    let sql = `INSERT INTO alquiler (fecha_alquiler, fecha_devolucion, juego, usuario, cantidad, estado)
               VALUES ('${fecha_alquiler}','${fecha_devolucion}', '${juego}', '${usuario}', '${cantidad}', '${estado}')`;

    const values = [fecha_alquiler, fecha_devolucion, juego, usuario, cantidad, estado];

    const [rows] = await pool.query(sql, values);
    if (rows.affectedRows > 0) {
      res.status(200).json({ "status": 200, "message": "Se registró el alquiler con éxito" });
    } else {
      res.status(401).json({ "status": 401, "message": "No se registró, hubo un error" });
    }
  } catch (e) {
    res.status(500).json({ "status": 500, "message": "Error en el servidor: " + e.message });
  }
};



export const listaralquiler = async (req, res) => {
  try {
      const [result] = await pool.query(`
          SELECT alquiler.*, juegos.nombre_juego, usuarios.nombre_usuario 
          FROM alquiler
          INNER JOIN juegos ON alquiler.juego = juegos.id_juego
          INNER JOIN usuarios ON alquiler.usuario = usuarios.id_usuario
      `);

      res.status(200).json(result);
  } catch (err) {
      res.status(500).json({
          message: 'Error en listaralquiler: ' + err
      });
  }
};



export const actualizaralquiler = async (req, res) => {
      try {
        let idalquiler = req.params.id;
        let { fecha_alquiler, fecha_devolucion, juego, usuario, cantidad, estado } = req.body;
    
        let sql = `UPDATE alquiler SET fecha_alquiler='${fecha_alquiler}', fecha_devolucion='${fecha_devolucion}', juego='${juego}', usuario='${usuario}', cantidad='${cantidad}', estado='${estado}' WHERE idalquiler=${idalquiler}`;
    
        const [rows] = await pool.query(sql);
        if (rows.affectedRows > 0) {
          res.status(200).json({ "status": 200, "message": "Se actualizó el registro con éxito" });
        } else {
          res.status(401).json({ "status": 401, "message": "No se pudo actualizar el registro, verifique el ID" });
        }
      } catch (e) {
        res.status(500).json({ "status": 500, "message": "Error en el servidor: " + e.message });
      }
    };
    

export const eliminaralquiler = async (req,res)=>{
      try{
       let id = req.params.id;
   
      let sql = `delete from alquiler where idalquiler=${id}`;
   
      const[rows] = await pool.query(sql)
      if(rows.affectedRows>0){
       res.status(200).json({"status":200,"message":"se elimino el alquiler con exito..."});
   
      }else{
   
       res.status(401).json({"status":401,"message":"no se ilimino el alquiler"});
      
      }
   
   
   }catch (e) {
       res.status(500).json({"status":500,"message":"error en el servidor "+e});
   } 
       
   };