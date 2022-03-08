<?php
	require(dirname(__FILE__) . '/../../common/functions.php');
    
    $class = $_GET['class'];
    $result = get_by_sql("Select * from timetable where class=:class order by period",[ 'class' => $class ]);	
    $result = json_encode($result);
    echo $result;
?>