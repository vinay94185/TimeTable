<?php
	require(dirname(__FILE__) . '/../../../common/functions.php');
    
    $teacher = $_GET['teacher'];
    $weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    $results = [];

    foreach($weekDays as $day) {
        $result = get_by_sql("Select * from timetable where teacher=:teacher and day=:day order by period",[ 'teacher' => $teacher,'day' => $day ]);	
        $results[$day] = $result;
    }
    
    echo json_encode($results);
?>