<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $id = $data['id'];
    $class = $data['class'];
    $subject = $data['subject'];

    if( execute_sql('update subjects set class=:class,subject=:subject where id=:id',[ 'id' => $id,'subject' => $subject, 'class' => $class ],$errorInfo) )
        echo "Subject Updated Sucessfully";
    else echo "Error While Updating Subject \n" . $errorInfo[2];
}