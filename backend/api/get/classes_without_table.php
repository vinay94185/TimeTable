<?php
    require_once __DIR__ . "/../../common/functions.php";
	$classes = get_by_sql("select * from classes where class not in(select distinct class from timetable)");
    $string = json_encode($classes);
    echo $string
?>