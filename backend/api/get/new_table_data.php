<?php
    require_once __DIR__ . "/../../common/functions.php";

    $class = $_GET['class'];
    $departments = get_by_sql('select * from departments');
    $subjects = get_by_sql("select * from `subjects` where class=:class",[ 'class' => $class ]); 
    $labs = get_by_sql("select * from labs");

    $data = [
        "departments" => $departments,
        "subjects" => $subjects,
        "labs" => $labs,
    ];

    $string = json_encode($data);
    echo $string
?>