/**
 * Created by tatan on 04-04-2017.
 */
// var liga = true;

$(document).ready(function () {
    verificarLiga();
});

function verificarLiga() {
    var liga = true;
    $.ajax({
        type: "POST",
        url: "../Logica/controlador-gestionar-torneo.php",
        data: {
            tipo: "obtenerCategoriasQueSiEstenJugandoUnTorneoPorTipo",
            tipoTorneo: "liga"
        }
    }).done(function (data) {
            var opts = $.parseJSON(data);
            if (opts == "") {
                liga = false;
                verificarTorneoGrupos(liga);
            }
    });
}

function verificarTorneoGrupos(liga) {
    var torneoGrupo = true;
    $.ajax({
        type: "POST",
        url: "../Logica/controlador-gestionar-torneo.php",
        data: {
            tipo: "obtenerCategoriasQueSiEstenJugandoUnTorneoPorTipo",
            tipoTorneo: "grupos"
        }
    }).done(function (data) {
        var opts = $.parseJSON(data);
        if (opts == "") {
            torneoGrupo = false;
        }
        if (!torneoGrupo && !liga){
            if ($(document).width() > 500){
                document.getElementById("imagenSinTorneo").style.display = 'block';
            }
            document.getElementById("pieImagenSinTorneo").style.display = 'block';
        }else {
            document.getElementById("imagenSinTorneo").style.display = 'none';
            document.getElementById("pieImagenSinTorneo").style.display = 'none';
        }
    });
}