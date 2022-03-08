<?php
	require(dirname(__FILE__) . '/../../../common/functions.php');
    
    $class = $_GET['class'];
    $weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    $results = [];
    foreach($weekDays as $day) {
        $result = get_by_sql("Select * from timetable where class=:class and day=:day order by period",[ 'class' => $class,'day' => $day ]);	
        $results[$day] = $result;
    }
    echo json_encode($results);
?>