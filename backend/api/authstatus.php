<?php require_once __DIR__ . "/../common/functions.php";

if(isset($_SESSION['username'])) {
    echo "true";
} else {
    echo "false";
}

?>