<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $dept = $data['department'];

    if(execute_sql('insert into departments(dept) values(:dept)',['dept' => $dept],$errorInfo) ) 
        echo "Department added Sucessfully";
    else echo "Error While Adding New Department \n" . $errorInfo[2];

}
