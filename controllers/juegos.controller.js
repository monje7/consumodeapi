import { pool } from '../database/conexion.js';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (res, img, cb) {
        cb(null, "public/img");
    },
    filename: function (req, img, cb) {
        cb(null, img.originalname);
    }
});

const upload = multer({ storage: storage });
export const cargarImagen = upload.single("img");



export const listarjuegos = async (req, res) => {
    try {
        const [result] = await pool.query(`select * from juegos`);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage: 'error en listarjuegos :' + err
        })
    }

};


export const buscarjuegos = async (req, res) => {

    try {

        let id = req.params.id;

        const [result] = await pool.query('select * from juegos where idjuego=' + id);
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({
            massage: 'error en buscarjuego :' + err
        })
    }

};


export const guardarjuegos = async (req, res) => {
    try {
        let { nombre, descripcion, precio } = req.body;

        let imagen = req.file.originalname;

        console.log(imagen);

        let sql = `insert into juegos (nombre,descripcion,imagen,precio)
            values('${nombre}','${descripcion}','${imagen}','${precio}')`;
        const [rows] = await pool.query(sql);
        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "se registro con exito" });
        }
        else {
            res.status(401).json({ "status": 401, "message": "no se registro ERROR" });

        }

    } catch (e) {
        res.status(500).json({ "status": 500, "message": "Error en el servidor: " + e });
    }
};
export const eliminarjuegos = async (req, res) => {
    try {
        let id = req.params.id;

        let sql = `delete from juegos where idjuego=${id}`;

        const [rows] = await pool.query(sql)
        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "se elimino el juego con exito..." });

        } else {

            res.status(401).json({ "status": 401, "message": "no se ilimino el juego" });

        }


    } catch (e) {
        res.status(500).json({ "status": 500, "message": "error en el servidor " + e });
    }

};


export const actualizarjuegos = async (req, res) => {
  
    try {
  let id = req.params.id;
    let { nombre, descripcion, precio } = req.body;

    let imagen = req.file.originalname;

        let sql = `update juegos SET nombre='${nombre}',descripcion='${descripcion}',imagen='${imagen}',precio='${precio}' where idjuego=${id}`;
        const [rows] = await pool.query(sql);
        if (rows.affectedRows > 0) {

            res.status(200).json({ "status": 200, "message": "se actualizo" });

        } else {

            res.status(401).json({ "status": 401, "message": "no se actualizo" });

        }

    } catch (e) {

        res.status(500).json({ "status": 500, "message": "error en el servidor:" + e });
    }

};