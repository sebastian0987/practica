<?php
class Conexion {
    private $cadenaConexion;
    private $user;
    private $password;
    private $objetoConexion;
    public function __construct() {
        $this->cadenaConexion = 'mysql:host=localhost;dbname=liga';
        $this->user = "root";
        $this->password = "";
//        $this->cadenaConexion = 'mysql:host=localhost;dbname=asociac1_liganorte';
//        $this->user = "asociac1";
//        $this->password = "fnz8D5F2r6";
    }
    public function conectar() {
        try {
            $this->objetoConexion = new PDO ( $this->cadenaConexion, $this->user, $this->password );
            $this->objetoConexion->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        } catch ( PDOException $ex ) {
            $this->desconectar();
            throw $ex;
        }
    }
    public function desconectar() {
        $this->objetoConexion = null;
    }
    public function ejecutarSinRetorno($strComando) {
        $ejecutar = $this->objetoConexion->prepare ( $strComando );
        $ejecutar->execute ();
        return $ejecutar;
    }
    public function ejecutarConRetorno($strComando) {
        $ejecutar = $this->objetoConexion->prepare( $strComando );
        $ejecutar->execute ();
        $rows = $ejecutar->fetchAll ();
        return $rows;
    }
}
?>