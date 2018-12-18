function modalEditarProyecto(idP, nuevoNombre, nuevaDesc) {
    $("#tituloModalEditar").val(nuevoNombre);
    $("#nuevoNombre").val(nuevoNombre);
    $("#nuevaDesc").val(nuevaDesc);
    $("#actualizarProyecto").attr('onClick', `actualizarProyecto(${idP})`);
    $("#editarProyecto").modal();
};
function cargarProyectos() {
    $.ajax({
        url: `/obtenerproyectos`,
        method: "GET",
        dataType: "json",
        success: function (res) {
            $("#tarjetas").html(" ");
            proyectosUsuario = res.length;
            $("#proyectosCreados").text(proyectosUsuario);
            for (var i = 0; i < res.length; i++) {
                $("#tarjetas").append(`<div class=" col-lg-4 col-md-7 mb-4 col-sm-12">
                <div class="card mb-4">
                    <div class="card-body cuerpo-tarjeta">
                        <a class="activator waves-effect mr-4" onclick="modalEditarProyecto(${res[i].idProyecto}, '${res[i].nombreProyecto}', '${res[i].descripcionProyecto}');"><i class="fa fa-edit white-text"></i></a>
                        <h4 class="titulo-tarjeta" id="titulo${res[i].idProyecto}"> ${res[i].nombreProyecto} </h4>
                        <hr class="divisor-tarjeta">
                        <p class="texto-tarjeta" id="descripcion${res[i].idProyecto}"> ${res[i].descripcionProyecto} </p>
                        <div style="text-align:center;">
                            <button id="${res[i].idProyecto}" class="btn btn-primary btn-md"> Ver proyecto
                        </div>
                    </div>
                </div>`);
            }
        },
        error: function (error) {
            console.error(error);
        }
    });
};
function crearProyecto() {
    var data = {
        nombreProyecto: $("#nombreProyecto").val(),
        descProyecto: $("#descProyecto").val()
    };
    $.ajax({
        url: `/crearproyectos`,
        method: "POST",
        data: data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#proyectoCreado").show().fadeOut(3000);
            cargarProyectos();
        },
        error: function (error) {
            console.error(error);
        }
    });
}
function actualizarProyecto(id) {
    var data = {
        idProyecto: id,
        nuevoNombre: $("#nuevoNombre").val(),
        nuevaDesc: $("#nuevaDesc").val()
    };
    $.ajax({
        url: `/actualizarproyectos`,
        method: "POST",
        data: data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#proyectoActualizado").show().fadeOut(3000);
            cargarProyectos();
        },
        error: function (error) {
            console.error(error);
        }
    });
};
$(document).ready(function () {
    $("#sdDash").addClass("active");
    cargarProyectos();
})