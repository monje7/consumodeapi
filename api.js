import express from 'express';

import { check } from "express-validator";

import bodyParser from "body-parser";

import usuarioRoute from './routers/usuario.route.js' ;

import juegosRoute from './routers/juegos.route.js';

import alquilerRoute from './routers/alquiler.route.js';

import autRoute from './routers/autenticacion.route.js';

import cors from 'cors'


const app= express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}) )
app.use(cors());



app.set('view engine','ejs');
app.set('views','./views');

app.get('/documents', (req,res) => {
    res.render('index.ejs');
});


app.use(express.static('./public'));


app.use(express.json());
app.use('/usuario',usuarioRoute);
app.use('/juegos',juegosRoute);
app.use('/alquiler',alquilerRoute);
app.use('/aut',autRoute);

app.listen(4000,()=>{
console.log('el servidor esta funcionando bien');
});
