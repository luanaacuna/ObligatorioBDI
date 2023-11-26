// @ts-nocheck
import express from 'express';

import bodyParser from "body-parser";
const app  = express()
app.listen('3307', function(){
    console.log("el nuevo funciona")
})




const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Contraseña123',
  database: 'my_db',
  port: 3306
})

connection.connect()
connection.use(infoApi)


//app.use(infoApi);




connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('Base de datos conectada en puerto ', connection.config.port )
})

connection.end()