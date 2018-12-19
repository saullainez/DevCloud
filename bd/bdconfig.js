var mysql = require('mysql');

var credenciales = {
    host:"db4free.net ",
    user:"saul10",
    password:"dcExpertos2018",
    port:"3306",
    database: "devcloud"
};

var conexion = mysql.createConnection(credenciales);
module.exports = conexion;