const express = require('express');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');
const routes = require('./routes');
const cors = require('cors');


const app = express();
const port = 9000;


// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '010203',
    database: 'preguntas'
};
//Coneccion con la base de datos
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(express.json())




// Conectar las rutas
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
