<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $name = $data['teacher'];
    $dept = $data['dept'];

    if( execute_sql('insert into teachers(name,dept) values(:name,:dept)',[ 'name' => $name, 'dept' => $dept ],$errorInfo) ) 
        echo "Teacher added Sucessfully";
    else echo "Error While Adding New Teacher \n" . $errorInfo[2];
}
