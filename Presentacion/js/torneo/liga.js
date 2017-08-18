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
var datos = [];
var codCategorias = [];
var finGetDatos = false;

$(document).ready(function () {
    obtenerListaCategorias();
    // getDatosLiga();
    // rellenarTablaGrupo(codCategoriasGrupo[0]);
});
   
function obtenerListaCategorias() {
    $.ajax({
        type: "POST",
        url: "../Logica/controlador-gestionar-torneo.php",
        data: {
            tipo: "obtenerCategoriasQueSiEstenJugandoUnTorneoPorTipo",
            tipoTorneo: "liga"
        }
    })
        .done(function (data) {
            var opts = $.parseJSON(data);
            if (opts == "") {
                document.getElementById("ulCategorias").style.display = 'none'
                return;
            }
            var j = 0;
            $.each(opts, function (i, d) {
                codCategorias.push(d.codigoCategoria);
                if (j == 0) {
                    $('#ulCategorias').append('<li class="active"> <a data-toggle="tab" href="#menu' + d.codigoCategoria + '"  >' + d.nombreCategoria + '</a></li>');
                } else {
                    $('#ulCategorias').append('<li> <a data-toggle="tab" href="#menu' + d.codigoCategoria + '"  >' + d.nombreCategoria + '</a></li>');
                }
                j++;
            });
            j = 0;
            $.each(opts, function (i, d) {
                if (j == 0) {
                    // alert(d.codigoCategoria)
                    $('#liga').append(
                        '<div id="menu' + d.codigoCategoria + '" class="tab-pane fade in active">' +
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
                        '<tbody id="tbody' + d.codigoCategoria + '">' +
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
                    $('#liga').append(
                        '<div id="menu' + d.codigoCategoria + '" class="tab-pane fade">' +
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
                        '<tbody id="tbody' + d.codigoCategoria + '">' +
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
                j++;
                $('#menu' + d.codigoCategoria).append('<button id="btCargando' + d.codigoCategoria + '" class="btn btn-primary btn-lg" disabled><i class="fa fa-spinner fa-spin"></i> Cargando</button>');
            });
            getTablaPosiciones(0);
        });
}


function getTablaPosiciones(posicionCategoria) {
    if (posicionCategoria == codCategorias.length) {
        return;
    }
    var categoria = codCategorias[posicionCategoria];
    // alert(categoria)
    $.ajax({
        type: "POST",
        url: "../Logica/controlador-gestionar-partido.php",
        data: {
            tipo: "obtenerClubes",
            categoria: categoria
        }
    }).done(function (data) {
        var opts = $.parseJSON(data);
        obtenerDatosTablaPorClub(0, opts, categoria, posicionCategoria);
    });
}

function obtenerDatosTablaPorClub(filaClub, clubes, categoria, posicionCategoria) {
    if (filaClub == clubes.length) {
        document.getElementById("btCargando" + categoria).style.display = 'none';
        llenarTablaPosiciones(categoria)
        datos.length = 0;
        getTablaPosiciones(posicionCategoria + 1)
        return
    }
    var club = clubes[filaClub][0];
    $.ajax({
        type: "POST",
        url: "../Logica/controlador-gestionar-partido.php",
        data: {
            tipo: "obtenerGolesPartidos",
            categoria: categoria,
            rutClub: club,
            tipoTorneo: 'liga'
        }
    }).done(function (data) {
        var opts = $.parseJSON(data);
        datos.push([opts[0][0], opts[0][1], opts[0][2], opts[0][3], opts[0][4], opts[0][5],(parseInt(opts[0][1])*3)+parseInt(opts[0][2])]);
        obtenerDatosTablaPorClub(filaClub + 1, clubes, categoria, posicionCategoria);
    });
}

function llenarTablaPosiciones(categoria) {
//----------Ordenamiento burbuja----------------------
    for (var i = 1; i < datos.length; i++) {
        for (var j = 0; j < (datos.length - i); j++) {
            if (datos[j][6] < datos[j + 1][6]) {
                a = datos[j + 1][0];
                b = datos[j + 1][1];
                c = datos[j + 1][2];
                d = datos[j + 1][3];
                e = datos[j + 1][4];
                f = datos[j + 1][5];
                g = datos[j + 1][6];
                datos[j + 1][0] = datos[j][0];
                datos[j + 1][1] = datos[j][1];
                datos[j + 1][2] = datos[j][2];
                datos[j + 1][3] = datos[j][3];
                datos[j + 1][4] = datos[j][4];
                datos[j + 1][5] = datos[j][5];
                datos[j + 1][6] = datos[j][6];
                datos[j][0] = a;
                datos[j][1] = b;
                datos[j][2] = c;
                datos[j][3] = d;
                datos[j][4] = e;
                datos[j][5] = f;
                datos[j][6] = g;
            }
            if (datos[j][6] == datos[j + 1][6]) {
                if ((datos[j][4] - datos[j][5]) < (datos[j + 1][4] - datos[j + 1][5])) {
                    a = datos[j + 1][0];
                    b = datos[j + 1][1];
                    c = datos[j + 1][2];
                    d = datos[j + 1][3];
                    e = datos[j + 1][4];
                    f = datos[j + 1][5];
                    g = datos[j + 1][6];
                    datos[j + 1][0] = datos[j][0];
                    datos[j + 1][1] = datos[j][1];
                    datos[j + 1][2] = datos[j][2];
                    datos[j + 1][3] = datos[j][3];
                    datos[j + 1][4] = datos[j][4];
                    datos[j + 1][5] = datos[j][5];
                    datos[j + 1][6] = datos[j][6];
                    datos[j][0] = a;
                    datos[j][1] = b;
                    datos[j][2] = c;
                    datos[j][3] = d;
                    datos[j][4] = e;
                    datos[j][5] = f;
                    datos[j][6] = g;
                }
            }
        }
    }
//-----------------------------------------------------
    $('#tbody' + categoria).empty();
    for (var i = 0; i < datos.length; i++) {
        $('#tbody' + categoria).append(
            "<tr>" +
            "<td>" + (parseInt(i)+1) + "</td>" +
            "<td>" + datos[i][0] + "</td>" +
            "<td>" + datos[i][6] + "</td>" +
            "<td>" + datos[i][1]+ "</td>" +
            "<td>" + datos[i][2] + "</td>" +
            "<td>" + datos[i][3] + "</td>" +
            "<td>" + datos[i][4] + "</td>" +
            "<td>" + datos[i][5] + "</td>" +
            "</tr>"
        );
    }
}