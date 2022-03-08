<?php require(dirname(__FILE__) . '/../../../common/functions.php');
    
    $room = $_GET['room'];
    if(is_numeric($room)) {
        $room = $_GET['room'];
        $selected = $room;
    } else {
        $lab = $_GET['room'];
        $selected = $lab;
        $room = -1;
    }
	
    $weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    $results = [];

	if(is_numeric($selected)) {
        foreach($weekDays as $day) {
            $result = get_by_sql("Select * from timetable where room=:room and day=:day order by period",[ 'room' => $selected,'day' => $day ]);	
            $results[$day] = $result;
        }
	} else {
        foreach($weekDays as $day) {
            $result = get_by_sql("Select * from timetable where lab=:lab and day=:day order by period",[ 'lab' => $selected,'day' => $day ]);	
            $results[$day] = $result;
        }
    }

    echo json_encode($results);
?>