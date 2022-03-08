<?php require('../../common/functions.php');

if(isset($_GET['id'])) {
    $id = $_GET['id'];
    if(execute_sql("delete from teachers where id=:id",['id' => $id],$errinfo)) {
        echo "Teacher Deleted Sucessfully";
    } else {
        echo "Failed To Delete : " . $errinfo[2];
    }
} else if(isset($_GET['dept'])) {
    $dept = $_GET['dept'];
    if(execute_sql("delete from teachers where dept=:dept",['dept' => $dept],$errinfo)) {
        echo "Teachers Deleted Sucessfully";
    } else {
        echo "Failed To Delete : " . $errinfo[2];
    }
} else {
    echo "Invalid Request";
}

?>