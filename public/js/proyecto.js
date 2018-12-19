function modalOpcionesCarpeta(idCarpeta, nuevoCarpeta) {
    $("#nuevoCarpeta").val(nuevoCarpeta);
    $("#actualizarCarpeta").attr('onClick', `actualizarCarpeta(${idCarpeta})`);
    $("#modalEliminarCarpeta").attr('onclick', `modalEliminarCarpeta(${idCarpeta})`);
    $("#modalOpcionesCarpeta").modal();
};
function modalEliminarCarpeta(idCarpeta){
    $("#borrarCarpeta").attr('onClick', `eliminarCarpeta(${idCarpeta})`);
    $("#modalConfirmarBorrado").modal();
};
function cargarCarpetas() {
    $.ajax({
        url: `/obtenercarpetas`,
        method: "GET",
        dataType: "json",
        success: function (res) {
            $("#carpetas").html(" ");
            $("#carpetasCreadas").text(res.length);
            for (var i = 0; i < res.length; i++){
                $("#carpetas").append(`
                <a class = "waves-effect list-group-item list-group-item-action waves-effect carpeta" style="color: beige;"> 
                    <i onclick="modalOpcionesCarpeta(${res[i].idCarpeta}, '${res[i].nombreCarpeta}');" class="fa fa-cog" style="color: beige;"></i>
                    <i class="fa fa-folder-open" style="color: beige;"></i>
                    ${res[i].nombreCarpeta} 
                </a>`);
            }
            /*$("#tarjetas").html(" ");
            proyectosUsuario = res.length;
            if(proyectosPlan == proyectosUsuario){
                $("#limite").show();
                $("#nP").hide();
            }
            else{
                $("#limite").hide();
                $("#nP").show();
            }
            $("#proyectosCreados").text(proyectosUsuario);
            for (var i = 0; i < res.length; i++) {
                $("#tarjetas").append(`<div class=" col-lg-4 col-md-7 mb-4 col-sm-12">
                <div class="card mb-4">
                    <div class="card-body cuerpo-tarjeta">
                        <a class="activator waves-effect mr-4" onclick="modalEditarProyecto(${res[i].idProyecto}, '${res[i].nombreProyecto}', '${res[i].descripcionProyecto}');"><i class="fa fa-edit white-text"></i></a>
                        <a class="icono-borrar waves-effect mr-4" onclick="modalEliminarProyecto(${res[i].idProyecto});"><i class="fa fa-trash white-text"></i></a>
                        <h4 class="titulo-tarjeta" id="titulo${res[i].idProyecto}"> ${res[i].nombreProyecto} </h4>
                        <hr class="divisor-tarjeta">
                        <p class="texto-tarjeta" id="descripcion${res[i].idProyecto}"> ${res[i].descripcionProyecto} </p>
                        <div style="text-align:center;">
                            <a href="proyecto/${res[i].idProyecto}" id="${res[i].idProyecto}" class="btn btn-primary btn-md"> Ver proyecto </a>
                        </div>
                    </div>
                </div>`);
            }*/
            console.log(res);
        },
        error: function (error) {
            console.error(error);
        }
    });
};
function crearCarpeta() {
    var data = {
        nombreCarpeta: $("#nombreCarpeta").val()
    };
    $.ajax({
        url: `/crearcarpeta`,
        method: "POST",
        data: data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#carpetaCreada").show().fadeOut(3000);
            cargarCarpetas();
        },
        error: function (error) {
            console.error(error);
        }
    });
}
function actualizarCarpeta(id) {
    var data = {
        nombreCarpeta: $("#nuevoCarpeta").val(),
        idCarpeta: id
    };
    $.ajax({
        url: `/actualizarcarpeta`,
        method: "POST",
        data: data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#carpetaActualizada").show().fadeOut(3000);
            cargarCarpetas();
        },
        error: function (error) {
            console.error(error);
        }
    });
}
function eliminarCarpeta(id) {
    var data = {
        idCarpeta: id
    };
    $.ajax({
        url: `/eliminarcarpeta`,
        method: "POST",
        data: data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#carpetaEliminada").show().fadeOut(3000);
            cargarCarpetas();
        },
        error: function (error) {
            console.error(error);
        }
    });
}
$(document).ready(function () {
    cargarCarpetas()
})