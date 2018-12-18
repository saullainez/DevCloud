$(document).ready(function () {
    $("#sdPerfil").addClass("active");
    var proyectosUsuario;
    function cargarDatosPerfil() {
        $.ajax({
            url: `/datosperfil`,
            method: "GET",
            dataType: "json",
            success: function (res) {
                var planConsumido = (proyectosUsuario / res[0].proyectosPlan) * 100;
                console.log(res);
                $("#nombreApellido").text(res[0].nombre + " " + res[0].apellido);
                $("#alias").text(res[0].alias);
                $("#correo").text(res[0].correo);
                $("#plan").text(res[0].tipo);
                $("#tituloModal").text("Editar información del usuario: " + res[0].nombre + " " + res[0].apellido);
                $("#nuevoAlias").val(res[0].alias);
                $("#nuevoCorreo").val(res[0].correo);
                $("#proyectosDisp").text(res[0].proyectosPlan);
                $("#planConsumido").text(planConsumido + " %");
                $("#barra").css("width", planConsumido + "%");
                if (planConsumido <= 52) {
                    $("#planConsumido").css("background-color", "#007bff");
                    $("#barra").css("background-color", "#007bff");
                }
                else if (planConsumido > 53 && planConsumido <= 84) {
                    $("#planConsumido").css("background-color", "#f80");
                    $("#barra").css("background-color", "#f80");
                }
                else {
                    $("#planConsumido").css("background-color", "#ff3547");
                    $("#barra").css("background-color", "#ff3547");
                }

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
            data: data,
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
            data: data,
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#planActualizado").show().fadeOut(3000);
                //$("#proyectosDisp").append(" ");
                cargarDatosPerfil();
            },
            error: function (error) {
                console.error(error);
            }
        });
    }

    function cargarProyectos() {
        $.ajax({
            url: `/obtenerproyectos`,
            method: "GET",
            dataType: "json",
            success: function (res) {
                proyectosUsuario = res.length;
                $("#proyectosGuard").text(proyectosUsuario);
            },
            error: function (error) {
                console.error(error);
            }
        });
    }

    cargarProyectos();
    cargarDatosPerfil();
    
    $("#Actualizar").click(function () {
        actualizarDatosPerfil();
        //$("#centralModalInfo").modal("close");
    });
    $("#actualizarPlan").click(function () {
        actualizarPlan();
    });

})
