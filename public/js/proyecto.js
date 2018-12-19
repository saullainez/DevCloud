function modalOpcionesCarpeta(idCarpeta, nuevoCarpeta) {
    $("#nuevoCarpeta").val(nuevoCarpeta);
    $("#actualizarCarpeta").attr('onClick', `actualizarCarpeta(${idCarpeta})`);
    $("#modalEliminarCarpeta").attr('onclick', `modalEliminarCarpeta(${idCarpeta})`);
    $("#modalOpcionesCarpeta").modal();
};
function modalEliminarCarpeta(idCarpeta) {
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
            $("#idCarpeta").html(" ");
            for (var j = 0; j < res.length; j++){
                $("#idCarpeta").append(`
                <option value = "${res[j].idCarpeta}"> ${res[j].nombreCarpeta} </option>
                `);
            };

            for (var i = 0; i < res.length; i++) {
                $("#carpetas").append(`
                <a id = "${res[i].idCarpeta}" class = "waves-effect list-group-item list-group-item-action waves-effect carpeta" style="color: beige;"> 
                    <i onclick="modalOpcionesCarpeta(${res[i].idCarpeta}, '${res[i].nombreCarpeta}');" class="fa fa-cog" style="color: beige;"></i>
                    <i class="fa fa-folder-open" style="color: beige;"></i>
                    ${res[i].nombreCarpeta} 
                </a>`);
            }
            console.log(res);
        },
        error: function (error) {
            console.error(error);
        }
    });
};
function cargarArchivos() {
    $.ajax({
        url: `/obtenerarchivos`,
        method: "GET",
        dataType: "json",
        success: function (res) {
            $("#archivosCreados").text(res.length);
            $("#archivos").html(" ");
            for (var i = 0; i < res.length; i++) {
                $("#archivos").append(`
                <div class = "col-lg-4 mb-5">
                    <div class = "card" style="background-color: #033e5a;">
                        <div class="card-body">
                            <h4 class="card-title" style="color: beige;"><a> ${res[i].nombreArchivo} </a></h4>
                            <hr style="background-color: beige;">
                            <span style="color:white"> Tipo: ${res[i].tipoArchivo} </span>
                            <p class="card-text" style="color: beige;"> ${res[i].contenidoArchivo} </p>
                        </div>
                    </div>
                </div>`);
            }
            console.log(res);
        },
        error: function (error) {
            console.error(error);
        }
    });
}
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
function crearArchivo() {
    var data = {
        nombreArchivo: $("#nombreArchivo").val(),
        tipoArchivo: $("#tipoArchivo").val(),
        contenidoArchivo: $("#contenidoArchivo").val(),
        idCarpeta: $("#idCarpeta").val()
    };
    $.ajax({
        url: `/creararchivo`,
        method: "POST",
        data: data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#archivoCreado").show().fadeOut(3000);
            cargarArchivos();
        },
        error: function (error) {
            console.error(error);
        }
    });
}
$(document).ready(function () {
    cargarCarpetas();
    cargarArchivos();
    $("#carpetas > a").each(function () {
        alert("$(this).id()");
    });



    var myCode;
    var editor = ace.edit("editor");
    $("#editor").show();

    // var seleccionado=$("#sel-lan").val();
    ace.require("ace/ext/language_tools");
    ace.require("ace/ext/emmet");

    editor.setTheme("ace/theme/TextMate");
    editor.session.setMode("ace/mode/html");
    //editor.getSession().setValue("write your code here");
    myCode = editor.getSession().getValue();
    editor.setOption("enableEmmet", true);
    editor.focus();

    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
})