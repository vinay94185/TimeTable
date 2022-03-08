<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $pclass = $data['prevclass'];
    $class = $data['class'];
    $dept = $data['department'];

    if( execute_sql('update classes set class=:class,dept = :dept where class=:pclass',[ 'pclass' => $pclass, 'class' => $class, 'dept' => $dept ],$errorInfo) ) 
        echo "Class updated Sucessfully";
    else echo "Error While Updating Class \n" . $errorInfo[2];
}
