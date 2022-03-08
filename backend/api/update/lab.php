<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $id = $data['id'];
    $lab = $data['lab'];

    if( execute_sql('update labs set lab=:lab where id=:id',[ 'id' => $id,'lab' => $lab ],$errorInfo) )
        echo "Lab Updated Sucessfully";
    else echo "Error While Updating \n" . $errorInfo[2];
}