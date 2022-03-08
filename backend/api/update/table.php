<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);
    $className = $data['class'];
    $data = $data['data'];

    execute_sql('DELETE from timetable where class=:class',['class' => $className],$errinfo);

    foreach($data as $key => $value){
        $period = -1;
        foreach($value as $row) {
            $period++;
            if($row['subject'] === '--------' || $row['subject'] === "" ) continue;
    
            if($row['lab'] === '' || $row['lab'] === '--------') $row['lab'] = NULL;
            else $row['room'] = NULL;
    
            $data = [
                'period' => $period,
                'day' => $key,
                'class' => $className,
                'dept' => $row['dept'],
                'teacher' => $row['teacher'],
                'subject' => $row['subject'],
                'room' => $row['room'],
                'lab' => $row['lab']
            ];
    
            if(!execute_sql("insert into timetable(period,class,dept,teacher,subject,room,lab,day) values(:period,:class,:dept,:teacher,:subject,:room,:lab,:day)",$data,$errorinfo)) {
                echo "\nError :  ";
                if($errorinfo[1] == 1062) {
                    $teacher = get_by_sql("select * from timetable where period=:period AND teacher = :teacher AND day=:day",['period' => $period, 'teacher' => $row['teacher'], 'day' => $key]); 
                    if(!empty($teacher)) {
                        echo "Collision Dettected : $key period : $period , Teacher : " . $row['teacher'];
                        echo "\nTeacher is Assigned to '".$teacher[0]['class'] ."' for ". $teacher[0]['subject'];
                    } else {
                        if( $row['lab'] === NULL) {
                            $room = get_by_sql("select * from timetable where period=:period AND room = :room AND day=:day",['period' => $period, 'room' => $row['room'], 'day' => $key]); 
                            echo "Collision Dettected : $key period : $period , Room : " . $row['room'];
                            echo "\nis Assigned to '".$room[0]['class'] ."' for ". $room[0]['subject'];  
                        } else {
                            $lab = get_by_sql("select * from timetable where period=:period AND lab=:lab AND day=:day",['period' => $period, 'lab' => $row['lab'], 'day' => $key]); 
                            echo "Collision Dettected : $key period : $period , Lab : " . $row['lab'];
                            echo "\nis Assigned to '".$lab[0]['class'] ."' for ". $lab[0]['subject'];
                        }
                    }
                } else {
                    echo $period . "\n";
                    echo $errorinfo[2];
                }
                die();
            }
        }
    }
    echo "TimeTable Updated Sucessfully";
}

?>