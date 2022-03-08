<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $id = $data['id'];
    $name = $data['teacher'];
    $dept = $data['dept'];

    if( execute_sql('Update teachers set name=:name,dept=:dept where id=:id',[ 'id' => $id, 'name' => $name, 'dept' => $dept ],$errorInfo) ) 
        echo "Teacher updated Sucessfully";
    else echo "Error While updating Teacher \n" . $errorInfo[2];
}
