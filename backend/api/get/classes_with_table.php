<?php

require(dirname(__FILE__) . '/../../common/functions.php');
$classes = get_by_sql('SELECT DISTINCT class FROM `timetable`');
$result = json_encode($classes);

echo $result;