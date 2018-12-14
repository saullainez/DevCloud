$(document).ready(function () {
    /*$("#mensaje").fadeOut(5000);
    var mensaje = $("#mensaje").val();
    alert(mensaje);
    if(mensaje != " ")
        $("#contenedor-mensaje").show().fadeOut(5000);*/
    $("#contenedor-mensaje").show().fadeOut(7000)
    new WOW().init();
    $('li.nav-item').click(function(){
        $('li.nav-item').removeClass("active");
        $(this).addClass("active");
    });
    $('a.list-group-item').click(function(){
        $('a.list-group-item').removeClass("active");
        $(this).addClass("active");
    });
})
