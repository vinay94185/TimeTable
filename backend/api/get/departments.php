<?php require('../../common/functions.php');
    $results = get_by_sql('select id,dept from departments');
	$json = json_encode($results);
	echo $json;
?>