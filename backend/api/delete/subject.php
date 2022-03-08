<?php require('../../common/functions.php');

if(isset($_GET['id'])) {
    $id = $_GET['id'];
    if(execute_sql("delete from subjects where id=:id",['id' => $id],$errinfo)) {
        echo "Subject Deleted Sucessfully";        
    } else {
        echo "Failed To Delete : " . $errinfo[2];
    }
} else if(isset($_GET['class'])) {
    $class = $_GET['class'];
    if(execute_sql("delete from subjects where class=:class",['class' => $class ],$errinfo)) {
        echo "Subjects Deleted Sucessfully";
    } else {
        echo "Failed To Delete : " . $errinfo[2];
    }
} else {
    echo "Invalid Request";
}
?>