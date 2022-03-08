<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $lab = $data['lab'];

    if( execute_sql('insert into labs(lab) values(:lab)',[ 'lab' => $lab ],$errorInfo) )
        echo "Lab added Sucessfully";
    else echo "Error While Adding New Lab \n" . $errorInfo[2];
}