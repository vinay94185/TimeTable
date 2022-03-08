<?php
    require_once __DIR__ . "/../../common/functions.php";
	$classes = get_by_sql("select * from classes");
    $string = json_encode($classes);
    echo $string
?>