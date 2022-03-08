<?php require_once __DIR__ . "/../../common/functions.php";


if(!isset($_GET['class'])) {
    die("Invalid Request");
}

$class = $_GET['class'];
if($class != "") {
    if(execute_sql('delete from classes where class=:class',['class' => $class],$errorInfo) ) 
        echo "Class Deleted Sucessfully";
    else echo "Error While Deleting \n" . $errorInfo[2];
}
