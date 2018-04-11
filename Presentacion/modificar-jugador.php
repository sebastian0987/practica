<?php
/**
 * Created by PhpStorm.
 * User: tatan
 * Date: 26-01-2017
 * Time: 11:31
 */
include "menuGlobal.php";
?>

<html>
<body>

<div class="row">
    <h1 class="page-header">Modificar Datos Jugador</h1>
</div>
<div class="row">
    <div class="col-lg-3">
        <div class="form-group">
            <label>Nombre Completo </label>
            <input id="tbNombre" class="form-control" placeholder="Andrés Aguilera Méndez" maxlength="50">
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-3">
        <div class="form-group">
            <label>RUT (Ingresar sin guion)</label>
            <input id="tbRut" class="form-control" placeholder="12345678k">
        </div>
    </div>
    <div class="col-lg-3">
        <br>
        <input type="checkbox" id="checkboxExtranjero"> Jugador Extranjero
    </div>
</div>
<div class="row">
    <div class="col-lg-3">
        <div class="form-group">
            <label>Categoria</label>
            <select id="dropdownCategoria" class="form-control" onchange="obtenerListaClubes(this.value);">
            </select>
        </div>
        <div class="form-group">
            <label>Club Deportivo </i></label>
            <select id="dropdownClub" class="form-control">
            </select>
        </div>
        <div class="form-group">
            <label>Fecha Inscripción</label>
            <input id="tbFechaInscripcion" type="date" class="form-control">
        </div>
        <div class="form-group">
            <label>Fecha Nacimiento</label>
            <input id="tbFechaNacimiento" type="date" class="form-control">
        </div>
        <div class="form-group">
            <label>Rol Jugador</label>
            <input id="tbRolJugador" class="form-control">
        </div>
        <div class="form-group">
            <label>Rol ANDABA</label>
            <input id="tbRolAndaba" class="form-control">
        </div>
        <div class="form-group">
            <label>Sanción (indique hasta que fecha durara la sanción)</label>
            <input id="tbFechaSancion" type="date" class="form-control">
        </div>
        <!--        <div class="form-group">-->
        <!--            <label>Ingrese foto del jugador</label>-->
        <!--            <input id="fotoJugador" type="file">-->
        <!--        </div>-->
        <div class="form-group">
            <button id="btAceptar" type="button" class="btn btn-success">Aceptar</button>
        </div>
    </div>
</div>
<div class="row">
    <div class="page-header">
    </div>
    <div class="well">
        <p>Union Comunal Deportiva Vecinal Liga Sector Norte * R.U.T.: 72.470.300-3 * Numero Contacto: 97105118 *
            Correo: liganorteantofagasta@gmail.com * Fecha Fundacion: 07/01/1977 * Personalidad Jurídica Nº358</p>
    </div>
</div>
<script type="text/javascript" src="js/modificar-jugador.js"></script>
</body>

<!-- Mensaje Error -->
<div class="modal fade" tabindex="-1" role="dialog" id="modalMensaje">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="background-color:#FFBABA">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                <h4 id="h4Error" class="modal-title">Error</h4>
            </div>
            <div class="modal-body">
                <p id="pError"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<!--Modal para solicitar-->
<div class="modal fade" id="modalSolicitar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div id="encabezadoModalSolicitar" class="modal-header" style="background-color:#BDE5F8">
                <h5 id="tituloModalSolicitud" class="modal-title">Buscar Jugador</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label id="mensajeModalSolicitud" for="recipient-name" class="form-control-label">Ingrese RUT
                            del jugador:</label>
                        <input id="tbBuscarJugador" type="text" class="form-control" placeholder="12345678k"
                               maxlength="50">
                        <label id="errorModalSolicitar" style="color:red;"></label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="btAceptarModalSolicitud" type="button" class="btn btn-success">Buscar</button>
                <button type="button" class="btn btn-secondary" onclick="location.href = 'index.php'">Volver Página
                    Principal
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Mensaje Confirmacion -->
<div class="modal fade" tabindex="-1" role="dialog" id="modalConfirmacion">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="background-color:#FEEFB3">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                <h4 id="tituloConfirmacion" class="modal-title">Confirmación</h4>
            </div>
            <div class="modal-body">
                <p id="mensajeConfirmacion">¿Está seguro que desea cambiar esta información?</p>
            </div>
            <div class="modal-footer">
                <button id="btConfirmar" type="button" class="btn btn-success" data-dismiss="modal">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
</html>
