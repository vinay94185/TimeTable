<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $class = $data['className'];
    $dept = $data['dept'];

    if( execute_sql('insert into classes(class,dept) values(:class,:dept)',[ 'class' => $class, 'dept' => $dept ],$errorInfo) ) 
        echo "Class added Sucessfully";
    else echo "Error While Adding New Class \n" . $errorInfo[2];
}
