<?php require('../../common/functions.php');

if(isset($_GET['id'])) {
    $id = $_GET['id'];
    if(execute_sql("delete from labs where id=:id",['id' => $id],$errinfo)) {
        echo "Lab Deleted Sucessfully";
    } else {
        echo "Failed To Delete : " . $errinfo[2];
    }
} else {
    echo "Invalid Request";
}
?>