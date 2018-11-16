var express = require("express"); //Importar el módulo express.
var bodyParser = require('body-parser');//Importar el módulo body-parser.
/*bodyParser es un Middleware que permite parsear el cuerpo de la solicitud entrante, y exponer esos datos, 
esto facilita acceder a esos ellos.*/
var controladorCorreo = require('./controladorCorreo.js');//Importar el módulo controladorCorreo.

var app = express();//Inicializar laa plicación express.

app.use(express.static("public")); //El framework "static" per.ite usar ficheros estáticos (ejemplo imágenes, css, etc.) en nuestro proyecto.
app.use(bodyParser.json());//Para procesar las peticiones que vienen como JSON.
app.use(bodyParser.urlencoded({extended:true}));//Para procesar las peticiones que vienen en la URL.


//----------------------------------RUTAS----------------------------------------------------------
//POST que maneja el envío del email.
app.post('/email', function(req, res){
    /*Se obtiene el JSON de configuración del correo a mandar y se almacena en mailOptions.
    Este es el JSON que se define en la función responderCorreoDeUsuario o enviarCorreoDeUsuario.*/
    var mailOptions = req.body;
    //Se usa la función "enviarCorreo" del módulo "controladorCorreo" para enviar el email.
    controladorCorreo.enviarCorreo(mailOptions, function(){
        res.json(resp);
    });
})

app.listen(8080, function(){
    console.log("Servidor corriendo");
});