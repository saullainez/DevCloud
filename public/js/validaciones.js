//Esperar a que cargue todo el DOM.
$(document).ready(function () {
    /*Validación para el input de correo electrónico.
    Esta función se ejecuta cada vez que se escribe sobre un input con la clase correo.*/
    $(".correo").on("keyup", function () {
        //Expresión regular para validar que el correo es correcto.
        var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        /*Si el valor del input coincide con la expresión regular.
        test() es un método nativo de JS, retorna true si encuentra coincidencias y false si no 
        las encuentra.*/
        if (regex.test($('.correo').val().trim())) {
            $(".email-invalido").hide();//Si encuentra coincidencias, esconde el mensaje de email inválido.
        } else {
            $(".email-invalido").show();//Si no encuentra coincidencias, muestra el mensaje de email inválido.
        }
    });
})