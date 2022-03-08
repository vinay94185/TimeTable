<?php require_once __DIR__ . "/../../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);


	if($data['newpass1'] == $data['newpass2']) {
        $oldpass = $data['oldpass'];
		$newpass = $data['newpass1'];

        $oldpass = hash("sha256",$oldpass);
		$result = get_by_sql("select * from admin where username='admin' and password=:pass",['pass' => $oldpass]);
		if(!empty($result)) {
			$newpass = hash("sha256",$newpass);
			$err = "";
			if(execute_sql("UPDATE admin SET password=:pass where username='admin' ",['pass' => $newpass],$err)) {
				echo "password updated sucessfully";
			} else {
				echo "failed to update password";
			}
		} else {
			echo "incorrect old password";
		}
	} else {
		echo "passwords didn't match";
	}

}

?>