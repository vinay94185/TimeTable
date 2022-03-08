<?php require('../../common/functions.php');
    $results = get_by_sql('select * from labs order by id');
	$json = json_encode($results);
	echo $json;
?>
