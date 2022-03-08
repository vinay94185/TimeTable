<?php session_start();
	require('config.php');
	
	if(!isset($_SESSION['username'])) {
		header('location:login.php');
	}	
?>
<html>
<head>
<?php include('common/headers.php') ?>
</head>
<body>
<?php include('common/wrapper_start.php'); ?>
<?php include('common/navbar.php'); ?>
<div class="container-fluid" >
	<div class="container">
		<div class="row">
			<div class="col-12 mx-auto my-5">
				<h4 class="display-4 text-center" >Export All TimeTable </h4>
			</div>
		</div>
		<div class="row" >
            <table class="table table-bordered table-striped table-hover">
                <thead class="thead-dark" >
                    <tr>
                        <th scope="col">Class </th>
                        <th scope="col">Action </th>
                    </tr>
                </thead>
                <tbody>
					<tr>
						<td> Class Wise </td>
						<td> <button onclick="location.href='exportall_by_class.php' " type="button" class="btn btn-primary"> Export </button> </td>
					</tr>
					<tr>
						<td> Teacher Wise </td>
						<td> <button onclick="location.href='exportall_by_teacher.php'" type="button" class="btn btn-primary"> Export </button> </td>
					</tr>
					<tr>
						<td> Room Wise </td>
						<td> <button onclick="location.href='exportall_by_room.php'" type="button" class="btn btn-primary"> Export </button> </td>
					</tr>
					<tr>
						<td> Dept Wise </td>
						<td> <button onclick="location.href='exportall_by_department.php'" type="button" class="btn btn-primary"> Export </button> </td>
					</tr>
				</tbody>
            </table>
        </div>
	</div>
</div>
<?php include('common/wrapper_end.php'); ?>
</body>
</html>