
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
//Esperar a que cargue todo el DOM.
$(document).ready(function () {
    /*Validación para el input de correo electrónico.
    Esta función se ejecuta cada vez que se escribe sobre un input con la clase correo.*/
    $(".correo").on("keypress", function(event){
        if(event.keyCode == 27){
            event.preventDefault();
        }
    });
    $(".correo").on("keyup", function (event) {

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

    $(".contrasena").on("keyup", function () {
        var reemplazar = /\s/g;
        var texto = $(this).val().trim().replace(reemplazar, "");
        $(this).val(texto);
        console.log($(this).val().trim());
        console.log(texto);
        var regex1 = /(?=.*\d)(?=.*[u0021-u002b-u003c-u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}/;
        //var regex1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{6,15}$/;
        //var regex1 = /(?=^.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
        if (regex1.test(texto)) {
            $("#pass").fadeOut(1000);
        } else {
            $("#pass").show();
        }
    });

    $("#form-pass2").on("keyup", function(){
        if($("#form-pass").val() == $("#form-pass2").val()){
            $("#contrasena-igual").addClass("alert-success");
            $("#contrasena-igual").removeClass("alert-danger");
            $("#contrasena-igual").html(`Las contraseñas coinciden <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`);
            $("#contrasena-igual").show();
            $("#registrarse").removeAttr("disabled");
        }else{
            $("#contrasena-igual").removeClass("alert-success");
            $("#contrasena-igual").addClass("alert-danger");
            $("#contrasena-igual").html(`Las contraseñas no coinciden <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`);
            $("#contrasena-igual").show();
        }
    });
})