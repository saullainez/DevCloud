//Esperar a que cargue todo el DOM.
$(document).ready(function () {
    /*Se captura el evento submit que genera el formulario, cuando el usuario presiona el botón de enviar.
    En vez de que el submit envíe la información al POST, se ejecuta lo siguiente:*/
    $("#formulario").submit(function (event) {
        event.preventDefault();
        //Esta es una funcionalidad de mdbootstrap que permite validar los campos del formulario.
        if (this.checkValidity() === false) {//Si la validación falla.
            event.stopPropagation(); //Se evita la propagación del evento.
            /*Agrega, al formulario, la clase "was-validated", esto permite mostrar los mensajes de error.
            En mi caso, son divs que tienen la clase "invalid-feedback".*/
            this.classList.add('was-validated');
        } else {//Si la validación es exitosa, se ejecuta la función enviarCorreoDeUsuario.
            enviarCorreoDeUsuario();
        }

    });

    //Esta función configura el correo a enviar y ejecuta un POST a la url /email, para enviarlo.
    function enviarCorreoDeUsuario() {
        //JSON de configuración del correo a enviar.
        var mailOptions = {
            from: $("#email").val(),
            to: 'infodevcloud@gmail.com',
            subject: $("#asunto").val(),
            html: `<p>Mensaje enviado desde la página web de <b>DevCloud</b></p>
                   <p>Nombre del remitente: <b>${$("#nombre").val()}</b> <br>
                      Correo electrónico del remitente: <b>${$("#email").val()}</b> <br>
                      Asunto: <b>${$("#asunto").val()}</b> <br></p>
                    <p>Mensaje: ${$("#mensaje").val()}</p>`
        }

        //Se ejecuta el POST a la url /email
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/email',
            /*Se envía el JSON de configuración, este es recibido en el lado del servidor y se envía como
            parámetro de la función "enviarCorreo" del módulo "controladorCorreo" previamente programado.*/
            data: JSON.stringify(mailOptions),
            dataType: 'json',
            success: function (res) {
                //Si se ejecuta el POST:
                responderCorreoDeUsuario();//Se envía un correo de respuesta (Feedback al email).
                $("#enviado").show().fadeOut(3000);//Feedback en la landingpage.
                $("#formulario")[0].reset();//Se resetea el formulario.
                /*Se elimina la clase "was-validated", para ocultar los mensajes de error 
                que se podrían haber mostrado*/
                $("#formulario").removeClass("was-validated");  
                console.log('Email enviado: ' + res);
            },
            error: function (error) {
                console.error(error);
            }
        });
    }

    /*Función que responde al correo del usuario. Cambia el cuerpo del correo y la dirección a la que se
    envía el email. Estas dos funciones pueden refactorizarse para que sea una sola genérica y modificar
    la configuración del email, dependiendo cada caso.
    Se ejecutaría un llamado recursivo en el success*/
    function responderCorreoDeUsuario() {
        var mailOptions = {
            from: 'infodevcloud@gmail.com',
            to: $("#email").val(),
            subject: 'Respuesta DevCloud',
            html: `<p>Mensaje enviado desde la página web de <b>DevCloud</b></p>
                   <p>Estimado(a) <b>${$("#nombre").val()}</b> <br>
                      Hemos recibido su correo electrónico, en breve nuestro equipo se contactará con usted
                      para dar una respuesta más concreta a su mensaje</p>
                    <p>El equipo de <b>DevCloud</b></p>`
        }

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/email',
            data: JSON.stringify(mailOptions),
            dataType: 'json',
            success: function (res) {
                $("#respuesta-usuario").show().fadeOut(5000);
                console.log('Email enviado: ' + res);
            },
            error: function (error) {
                console.error(error);
            }
        });
    }
})