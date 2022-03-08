<?php require('../../common/functions.php');

    $result = get_by_sql("select distinct room from timetable union select distinct lab from timetable");

    $tmp = $result;
    $result = [];
    foreach($tmp as $t) {
        if($t['room'] == "" || $t['room'] == "0") continue;
        $result[] = $t;
    }

    $json = json_encode($result);
	echo $json;
?>