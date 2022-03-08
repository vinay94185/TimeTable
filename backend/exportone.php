<?php session_start();
	require('common/functions.php');
	
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
				<h4 class="display-4 text-center" >Export TimeTable </h4>
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
						<td> 
							<form method="GET" action="exportone_by_class.php" >
								<select name="item"  required >
									<option name="export" selected disabled > -- select -- </option>
									<?php 
										$items = get_by_sql('select * from classes');
										foreach($items as $item_row):
									?>
									<option value="<?php echo $item_row['class'] ?>" > <?php echo $item_row['class'] ?> </option>
									<?php endforeach ?>
								</select>
								<button type="submit" class="btn btn-primary"> Export </button> 
							</form>
						</td>
					</tr>
					<tr>
						<td> Teacher Wise </td>
						<td> 
							<form method="GET" action="exportone_by_teacher.php" >
								<select name="item"  required >
									<option name="export" selected disabled > -- select -- </option>
									<?php
										$items = get_by_sql('select * from teachers');
										foreach($items as $item_row):
									?>
									<option value="<?php echo $item_row['name'] ?>" > <?php echo $item_row['name'] ?> </option>
									<?php endforeach ?>
								</select>
								<button type="submit" class="btn btn-primary"> Export </button> 
							</form>
						</td>
					</tr>
					<tr>
						<td> Room Wise </td>
						<td> 
							<form method="GET" action="exportone_by_room.php" >
								<select name="item"  required >
									<option name="export" selected disabled > -- select -- </option>
									<?php 
										$items = get_by_sql('select distinct room from timetable UNION select distinct lab from timetable');
										foreach($items as $item_row):
											if($item_row['room'] == '0' || $item_row['room'] == "") continue;
									?>
									<option value="<?php echo $item_row['room'] ?>" > <?php echo $item_row['room'] ?> </option>
									<?php endforeach ?>
								</select>
								<button type="submit" class="btn btn-primary"> Export </button> 
							</form>
						</td>
					</tr>
					<tr>
						<td> Dept Wise </td>
						<td> 
							<form method="GET" action="exportone_by_department.php" >
								<select name="item"  required >
									<option name="export" selected disabled > -- select -- </option>
									<?php 
										$items = get_by_sql('select * from departments');
										foreach($items as $item_row):
									?>
									<option value="<?php echo $item_row['dept'] ?>" > <?php echo $item_row['dept'] ?> </option>
									<?php endforeach ?>
								</select>
								<button type="submit" class="btn btn-primary"> Export </button> 
							</form>
						</td>
					</tr>
				</tbody>
            </table>
        </div>
	</div>
</div>
<?php include('common/wrapper_end.php'); ?>
</body>
</html>