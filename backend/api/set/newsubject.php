<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $class = $data['class'];
    $subject = $data['subject'];

    if( execute_sql('insert into subjects(class,subject) values(:class,:subject)',[ 'subject' => $subject, 'class' => $class ],$errorInfo) )
        echo "Subject added Sucessfully";
    else echo "Error While Adding New Subject \n" . $errorInfo[2];
}