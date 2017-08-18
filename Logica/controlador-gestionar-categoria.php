<?php

include '../Datos/query.php';

try {
    $conexion = new query();

    switch ($_POST ['tipo']) {
        case 'ingresar' :
            $nombre = $_POST["Nombre"];
            $codigo = preg_replace('/\s+/', '', $nombre);
            $ListaClubDeportivo = $_POST["ListaClub"];
            $conexion->setCategoria($codigo,$nombre);
            for ($i = 0; $i < count($ListaClubDeportivo); $i++) {
                $conexion->setEquipo($codigo . $ListaClubDeportivo[$i], $codigo, $ListaClubDeportivo[$i]);
            }
            echo "ingresado";
            break;
        case 'obtenerListaClub' :
            $respuesta = $conexion->getListaClubes();
            echo json_encode($respuesta);
            break;
        case 'obtenerCategorias':
            $respuesta = $conexion->getListaCategorias();
            echo json_encode($respuesta);
            break;
        case 'modificar':
            $codigo = $_POST["Codigo"];
            $nombre = $_POST["Nombre"];
            $conexion->updateCategoria($codigo,$nombre);
            echo "modificado";
            break;
        case 'eliminar':
            $codigo = $_POST["Codigo"];
            $conexion->deleteCategoria($codigo);
            $conexion->deleteEquipoSegunCategoria($codigo);
            echo "eliminado";
            break;
    }
} catch (Exception $e) {
    echo $e;
}
?>