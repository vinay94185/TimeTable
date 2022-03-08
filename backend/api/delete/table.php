<?php require_once __DIR__ . "/../../common/functions.php";



if(isset($_GET['class'])) {
    $className = $_GET['class'];
    if(execute_sql('DELETE from timetable where class=:class',['class' => $className],$errinfo)) {
        echo "Table Deleted Sucessfully";
    } else {
        echo "Failed To Delete : " . $errinfo[2];
    }
} else {
    if(execute_sql('DELETE from timetable',null,$errinfo)) {
        echo "Tables Deleted Sucessfully";
    } else {
        echo "Failed To Delete : " . $errinfo[2];
    }
}

?>