<?php session_start();

require(__DIR__ . '/../config.php');

// remove in production
header('Access-Control-Allow-Origin: http://localhost:3000 ');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization,credentials, X-Requested-With');


$db = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass);

function get_by_sql($sql,$params = NULL) {
    global $db;
    $stmt = $db -> prepare($sql);
    if($params != NULL) {
        $keys = array_keys($params);
        for($i = 0; $i < count($keys); ++$i) {
            $stmt -> bindParam($keys[$i],$params[$keys[$i]]);
        }
    }
    $stmt -> execute();
    return $stmt -> fetchAll( PDO::FETCH_ASSOC );
}

function execute_sql($sql,$params = NULL,&$errInfo) {
    global $db;
    $stmt = $db -> prepare($sql);
    if($params != NULL) {
        $keys = array_keys($params);
        for($i = 0; $i < count($keys); ++$i) {
            $stmt -> bindParam($keys[$i],$params[$keys[$i]]);
        }
    }
    $result = $stmt -> execute();
    $errInfo = $stmt -> errorInfo();
    return $result;
}

function get_teachers_by_dept($dept) {
    global $db;
    $stmt = $db -> prepare("SELECT * FROM `teachers` where dept=:dept");
    $stmt -> bindParam(':dept',$dept);
    $stmt -> execute();
    return $stmt -> fetchAll( PDO::FETCH_ASSOC );
}

?>