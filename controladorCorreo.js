//Módulo que permite enviar correos electrónicos desde nuestro sitio web.
var nodemailer = require('nodemailer');//Se importa el módulo nodemailer.

//Se crea y exporta la función "enviarCorreo".
exports.enviarCorreo = function (mailOptions, callback) {

    //transporter es el objeto que permite enviar el email.
    var transporter = nodemailer.createTransport({
        service: 'Gmail',//Se define el servicio
        //La autenticación de la cuenta desde la que se enviarán los correos 
        auth: {
            user: 'infodevcloud@gmail.com',
            pass: 'DevCloud_info2018'
        }
    });

    /*sendMail es la función del objeto transporter que permite enviar el correo con la configuración
    que se le envía en mailOptions*/
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            /*Si no hay error, se obtiene la respuesta con info.response, se almacena en resp y se envía mediante
            el callback*/
            resp = info.response;
            return callback (null, resp);
        }
    });
}