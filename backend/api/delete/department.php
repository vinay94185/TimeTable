<?php require_once __DIR__ . "/../../common/functions.php";


if(!isset($_GET['dept'])) {
    die("Invalid Request");
}

$dept = $_GET['dept'];
if($dept != "") {
    if(execute_sql('delete from departments where dept=:dept',['dept' => $dept],$errorInfo) ) 
        echo "Department Deleted Sucessfully";
    else echo "Error While Deleting \n" . $errorInfo[2];
}
