function cargarDatosPerfil() {
    $.ajax({
        url: `/datosperfil`,
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#nombreApellido").text(res[0].nombre + " " + res[0].apellido);
            $("#alias").text(res[0].alias);
            $("#correo").text(res[0].correo);
            $("#plan").text(res[0].tipo);
            $("#tituloModal").text("Editar información del usuario: " + res[0].nombre + " " + res[0].apellido);
            $("#nuevoAlias").val(res[0].alias);
            $("#nuevoCorreo").val(res[0].correo);
        },
        error: function (error) {
            console.error(error);
        }
    });
}
function actualizarDatosPerfil() {
    var data = {
        correo: $("#nuevoCorreo").val(),
        alias: $("#nuevoAlias").val()
    };
    $.ajax({
        url: `/datosperfil`,
        method: "POST",
        data:data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            //$("#actualizado").show();
            $("#actualizado").show().fadeOut(3000);
            cargarDatosPerfil();
        },
        error: function (error) {
            console.error(error);
        }
    });
}
function actualizarPlan() {
    var data = {
        plan: $("#nuevoPlan").val()
    };
    $.ajax({
        url: `/actualizarplan`,
        method: "POST",
        data:data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#planActualizado").show().fadeOut(3000);
            cargarDatosPerfil();
        },
        error: function (error) {
            console.error(error);
        }
    });
}
cargarDatosPerfil();
$("#Actualizar").click(function() {
    actualizarDatosPerfil();
    //$("#centralModalInfo").modal("close");
  });
$("#actualizarPlan").click(function() {
    actualizarPlan();
});