var mysql = require('mysql');

var credenciales = {
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database: "prueba"
};

var conexion = mysql.createConnection(credenciales);
module.exports = conexion;