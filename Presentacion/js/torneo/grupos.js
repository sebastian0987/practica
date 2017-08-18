/**
 * Created by Andrés on 05-03-2017.
 */
// datosGrupo:
// 0 categoria
// 1 posicion
// 2 nombreclub
// 3 pg
// 4 pe
// 5 pp
// 6 pts
// 7 grupo

var datosGrupo = [];
var codCategoriasGrupo = [];
var grupos = [];

$(document).ready(function () {
    obtenerListaCategoriasGrupos();

});
function getGruposPorCategoria(posicionCategoria) {
    if (posicionCategoria == codCategoriasGrupo.length){
        return;
    }
    var categoria = codCategoriasGrupo[posicionCategoria];
    $.ajax({
        type: "POST",
        url: "../Logica/controlador-gestionar-torneo.php",
        data: {
            tipo: "obtenerGruposPorCategoria",
            categoria: categoria
        }
    }).done(function (data) {
            // alert(categoria)
            var opts = $.parseJSON(data);
            var a = 0;
            var letras = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H'];
            // getDatosClubesGrupo(categoria);
            $.each(opts, function (i, d) {
                if (a == 0) {
                    $('#ulGrupos' + categoria).append('<li class="active"> <a data-toggle="tab" href="#menuGrupo' + d.codigoGrupo + '"  >' + letras[a] + '</a></li>');
                } else {
                    $('#ulGrupos' + categoria).append('<li> <a data-toggle="tab" href="#menuGrupo' + d.codigoGrupo + '" >' + letras[a] + '</a></li>');
                }
                // rellenarTablaGrupo(categoria, d.codigoGrupo);
                a++;
            });
            a = 0;
            $.each(opts, function (i, d) {
                if (a == 0) {
                    // alert(d.codigoCategoria)
                    $('#tabs' + categoria).append(
                        '<div id="menuGrupo' + d.codigoGrupo + '" class="tab-pane fade in active">' +
                        '<div class="table-responsive">' +
                        '<table class="table table-bordered table-hover table-striped">' +
                        '<thread>' +
                        '<tr>' +
                        '<th>Posición</th>' +
                        '<th>Club</th>' +
                        '<th>Pts</th>' +
                        '<th>PG</th>' +
                        '<th>PE</th>' +
                        '<th>PP</th>' +
                        '<th>GF</th>' +
                        '<th>GC</th>' +
                        '</tr>' +
                        '</thread>' +
                        '<tbody id="tbodyGrupo' + d.codigoGrupo + '">' +
                        // '<tr>' +
                        // '<td> ' + posiciones[0] +' </td>' +
                        // '<td> ' + nomClubes[0] +' </td>' +
                        // '<td> ' + PG[0] +' </td>' +
                        // '<td> ' + PE[0] +' </td>' +
                        // '<td> ' + PP[0] +' </td>' +
                        // '<td> ' + puntos[0] +' </td>' +
                        // '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '</div>' +
                        '</div>');
                } else {
                    // alert(d.codigoCategoria)
                    $('#tabs' + categoria).append(
                        '<div id="menuGrupo' + d.codigoGrupo + '" class="tab-pane fade">' +
                        '<div class="table-responsive">' +
                        '<table class="table table-bordered table-hover table-striped">' +
                        '<thread>' +
                        '<tr>' +
                        '<th>Posición</th>' +
                        '<th>Club</th>' +
                        '<th>Pts</th>' +
                        '<th>PG</th>' +
                        '<th>PE</th>' +
                        '<th>PP</th>' +
                        '<th>GF</th>' +
                        '<th>GC</th>' +
                        '</tr>' +
                        '</thread>' +
                        '<tbody id="tbodyGrupo' + d.codigoGrupo + '">' +
                        // '<tr>' +
                        // '<td> ' + posiciones[0] +' </td>' +
                        // '<td> ' + nomClubes[0] +' </td>' +
                        // '<td> ' + PG[0] +' </td>' +
                        // '<td> ' + PE[0] +' </td>' +
                        // '<td> ' + PP[0] +' </td>' +
                        // '<td> ' + puntos[0] +' </td>' +
                        // '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '</div>' +
                        '</div>');
                }
                a++;
                $('#menuGrupo' + d.codigoGrupo).append('<button id="btCargando' + d.codigoGrupo + '" class="btn btn-primary btn-lg" disabled><i class="fa fa-spinner fa-spin"></i> Cargando</button>');
            });
        getTablaPosicionesGrupo(posicionCategoria,opts,0)

        });
}



function obtenerListaCategoriasGrupos() {
    $.ajax({
        type: "POST",
        url: "../Logica/controlador-gestionar-torneo.php",
        data: {
            tipo: "obtenerCategoriasQueSiEstenJugandoUnTorneoPorTipo",
            tipoTorneo: "grupos"
        }
    }).done(function (data) {
        var opts = $.parseJSON(data);
        $.each(opts, function (i, d) {
            codCategoriasGrupo.push(d.codigoCategoria);
            $('#divCategorias').append(
                '<div class="panel panel-green" style="background: none">' +
                '<div class="panel-heading">' +
                '<h3 class="panel-title">' + d.nombreCategoria + '</h3>' +
                '</div>' +
                '<div class="panel-body">' +
                '<ul class="nav nav-tabs" id="ulGrupos' + d.codigoCategoria + '"  >' +
                '</ul> ' +
                '<div id="tabs' + d.codigoCategoria + '" class="tab-content"  >' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
        });
        getGruposPorCategoria(0);

    });
}



function getTablaPosicionesGrupo(posicionCategoria,grupos,posicionGrupo) {
    // alert(grupos.length)
    if (posicionGrupo == grupos.length){
        getGruposPorCategoria(posicionCategoria+1);
        return;
    }
    var grupo = grupos[posicionGrupo][0];
    var categoria = codCategoriasGrupo[posicionCategoria]
    $.ajax({
        type: "POST",
        url: "../Logica/controlador-gestionar-partido.php",
        data: {
            tipo: "obtenerClubPorGrupo",
            Grupo: grupo
        }
    }).done(function (data) {
        var opts = $.parseJSON(data);
        obtenerDatosTablaPorClubGrupo(0, opts,posicionCategoria,grupos,posicionGrupo);
    });
}

function obtenerDatosTablaPorClubGrupo(filaClub, clubes, posicionCategoria,grupos,posicionGrupo) {
    var categoria = codCategoriasGrupo[posicionCategoria];
    if (filaClub == clubes.length) {
        document.getElementById("btCargando"+grupos[posicionGrupo][0]).style.display = 'none';
        llenarTablaPosicionesGrupo(grupos[posicionGrupo][0]);
        datosGrupo.length = 0;
        getTablaPosicionesGrupo(posicionCategoria,grupos,posicionGrupo+1);
        return;
    }
    var club = clubes[filaClub][0];
    $.ajax({
        type: "POST",
        url: "../Logica/controlador-gestionar-partido.php",
        data: {
            tipo: "obtenerGolesPartidos",
            categoria: categoria,
            rutClub: club,
            tipoTorneo: 'grupos'
        }
    }).done(function (data) {
        var opts = $.parseJSON(data);
        datosGrupo.push([opts[0][0], opts[0][1], opts[0][2], opts[0][3], opts[0][4], opts[0][5], (parseInt(opts[0][1]) * 3) + parseInt(opts[0][2])]);
        obtenerDatosTablaPorClubGrupo(filaClub + 1, clubes,posicionCategoria,grupos,posicionGrupo);
    });
}

function llenarTablaPosicionesGrupo(codigoGrupo) {
//----------Ordenamiento burbuja----------------------
    for (var i = 1; i < datosGrupo.length; i++) {
        for (var j = 0; j < (datosGrupo.length - i); j++) {
            if (datosGrupo[j][6] < datosGrupo[j + 1][6]) {
                a = datosGrupo[j + 1][0];
                b = datosGrupo[j + 1][1];
                c = datosGrupo[j + 1][2];
                d = datosGrupo[j + 1][3];
                e = datosGrupo[j + 1][4];
                f = datosGrupo[j + 1][5];
                g = datosGrupo[j + 1][6];
                datosGrupo[j + 1][0] = datosGrupo[j][0];
                datosGrupo[j + 1][1] = datosGrupo[j][1];
                datosGrupo[j + 1][2] = datosGrupo[j][2];
                datosGrupo[j + 1][3] = datosGrupo[j][3];
                datosGrupo[j + 1][4] = datosGrupo[j][4];
                datosGrupo[j + 1][5] = datosGrupo[j][5];
                datosGrupo[j + 1][6] = datosGrupo[j][6];
                datosGrupo[j][0] = a;
                datosGrupo[j][1] = b;
                datosGrupo[j][2] = c;
                datosGrupo[j][3] = d;
                datosGrupo[j][4] = e;
                datosGrupo[j][5] = f;
                datosGrupo[j][6] = g;
            }
            if (datosGrupo[j][6] == datosGrupo[j + 1][6]) {
                if ((datosGrupo[j][4] - datosGrupo[j][5]) < (datosGrupo[j + 1][4] - datosGrupo[j + 1][5])) {
                    a = datosGrupo[j + 1][0];
                    b = datosGrupo[j + 1][1];
                    c = datosGrupo[j + 1][2];
                    d = datosGrupo[j + 1][3];
                    e = datosGrupo[j + 1][4];
                    f = datosGrupo[j + 1][5];
                    g = datosGrupo[j + 1][6];
                    datosGrupo[j + 1][0] = datosGrupo[j][0];
                    datosGrupo[j + 1][1] = datosGrupo[j][1];
                    datosGrupo[j + 1][2] = datosGrupo[j][2];
                    datosGrupo[j + 1][3] = datosGrupo[j][3];
                    datosGrupo[j + 1][4] = datosGrupo[j][4];
                    datosGrupo[j + 1][5] = datosGrupo[j][5];
                    datosGrupo[j + 1][6] = datosGrupo[j][6];
                    datosGrupo[j][0] = a;
                    datosGrupo[j][1] = b;
                    datosGrupo[j][2] = c;
                    datosGrupo[j][3] = d;
                    datosGrupo[j][4] = e;
                    datosGrupo[j][5] = f;
                    datosGrupo[j][6] = g;
                }
            }
        }
    }
//-----------------------------------------------------
    $('#tbodyGrupo' + codigoGrupo).empty();
    for (var i = 0; i < datosGrupo.length; i++) {
        $('#tbodyGrupo' + codigoGrupo).append(
            "<tr>" +
            "<td>" + (parseInt(i) + 1) + "</td>" +
            "<td>" + datosGrupo[i][0] + "</td>" +
            "<td>" + datosGrupo[i][6] + "</td>" +
            "<td>" + datosGrupo[i][1] + "</td>" +
            "<td>" + datosGrupo[i][2] + "</td>" +
            "<td>" + datosGrupo[i][3] + "</td>" +
            "<td>" + datosGrupo[i][4] + "</td>" +
            "<td>" + datosGrupo[i][5] + "</td>" +
            "</tr>"
        );
    }
}