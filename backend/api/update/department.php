<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

    $prevdept = $data['prevdept'];
    $dept = $data['department'];

    if(execute_sql('update departments set dept=:dept where dept=:pdept',['pdept' => $prevdept, 'dept' => $dept],$errorInfo) ) 
        echo "Department updated Sucessfully";
    else echo "Error While Updating Department \n" . $errorInfo[2];

}
