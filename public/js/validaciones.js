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
        if (regex.test($(this).val().trim())) {
            $(this).removeClass("invalid");
            $(this).addClass("valid");
        } else {
            $(this).removeClass("valid");
            $(this).addClass("invalid");
        }
    });

    $(".contraseña").on("keyup", function(){
        var regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
        if(regex.test($(".contraseña").val().trim())){
            $('.contraseña').removeClass("invalid");
        } else {
            $('.contraseña').addClass("invalid");
        }
    });
})