<?php require('../../common/functions.php');

	$results;
	if(isset($_GET['dept'])) {
		$dept = $_GET['dept'];
		$results = get_by_sql("select * from teachers where dept=:dept",['dept' => $dept]);			
	} else if(isset($_GET['id'])) {
		$id = $_GET['id'];
		$results = get_by_sql("select * from teachers where id=:id",['id' => $id]);			
	} else {
		$results = get_by_sql("select * from teachers");			
	}
	$json = json_encode($results);
	echo $json;
?>