<?php require_once __DIR__ . "/../common/functions.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json,true);

	$user = $data['uname'];
	$pass = $data['password'];
	
	$pass = hash("sha256",$pass);
		
	$stmt = $db -> prepare("SELECT * FROM admin where username=:user AND password=:pass");
	$stmt -> bindParam(':user',$user);
	$stmt -> bindParam(':pass',$pass);
    $stmt -> execute();
    	
	if($stmt -> rowCount() == 1) {
        $_SESSION['username'] = $user;
        echo "Login Sucessfull";
    } else {
        echo "Wrong username or password";
    }
}

?>