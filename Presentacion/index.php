<?php
include "menuGlobal.php";
?>
<html>
<head>
    <!-- Importar estilos -->
    <link href="css/index.css" rel="stylesheet">
    <link href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet"/>

</head>

<body>

<div class="row">
    <div class="col-lg-4">
        <IMG SRC="image/logo.png" class="escudoPrimario">
    </div>
    <div class="col-lg-8">
        <IMG SRC="image/sin-torneo.png" class="sinTorneo" id="imagenSinTorneo">
        <h2 id="pieImagenSinTorneo" >Lo sentimos, pero actualmente no se esta desarrollando ningún torneo</h2>
    </div>
    <div class="col-lg-8">
        <ul id="ulCategorias" class="nav nav-tabs">
        </ul>

        <div class="tab-content" id="liga">

        </div>
    </div>
    <div id="divCategorias" class="col-lg-8">

    </div>
</div>
<div class="row">
    <div class="page-header">
    </div>
    <div class="well" style="text-align: center">
        <p>Union Comunal Deportiva Vecinal Liga Sector Norte * R.U.T.: 72.470.300-3 * Numero Contacto: 97105118 *
            Correo: liganorteantofagasta@gmail.com * Fecha Fundacion: 07/01/1977 * Personalidad Jurídica Nº358</p>
    </div>
</div>

<script src="js/torneo/grupos.js"></script>
<script src="js/torneo/liga.js"></script>
<script src="js/index.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>


</body>
</html>
