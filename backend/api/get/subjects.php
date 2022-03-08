<?php require('../../common/functions.php');

	$results;
	if(isset($_GET['class'])) {
		$class = $_GET['class'];
		$results = get_by_sql("select * from subjects where class=:class",['class' => $class]);			
	} else if(isset($_GET['id'])) {
		$id = $_GET['id'];
		$results = get_by_sql("select * from subjects where id=:id",['id' => $id]);			
	} else {
		$results = get_by_sql("select * from subjects");			
	}
	$json = json_encode($results);
	echo $json;
?>