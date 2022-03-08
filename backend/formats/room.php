<?php require(dirname(__FILE__) . '/../common/functions.php');
	
	$rooms = get_by_sql('SELECT DISTINCT room FROM `timetable`');
	$labs = get_by_sql('SELECT DISTINCT lab FROM `timetable` where room=0');
	
	if(!empty($rooms))$room = $rooms[0]['room'];
	else $room = "";
	$lab = '';
	
	$selected = $room;
	if(isset($_GET['opt'])) {
		if($_GET['opt'] != "") {
			if(is_numeric($_GET['opt'])) {
				$room = $_GET['opt'];
				$selected = $room;
			} else { 
				$lab = $_GET['opt'];
				$selected = $lab;
				$room = -1;
			}
		}
	}

	
	$result;
	if(is_numeric($selected)) {
	  $result = get_by_sql("SELECT * FROM `timetable` where room='".$selected."' ORDER BY period");
	} else {
	  $result = get_by_sql("SELECT * FROM `timetable` where lab='".$selected."' ORDER BY period");
	}
  

	//$result = get_by_sql("Select * from timetable where room=:room OR lab=:lab order by period",[ 'room' => $room, 'lab' => $lab ]);
?>

	<div class="table-responsive">
		 <table class="table table-hover table-bordered">
		  <thead class="thead-dark">
			<tr>
			  <th scope="col">
				<select onChange="onClassChange(this);">
				<?php foreach($rooms as $room): ?>
					<?php if($room['room'] == 0) continue; ?>
					<?php if($room['room'] == $_GET['opt']) : ?>
						<option selected> <?php echo $room['room']; ?></option>
					<?php else: ?>
						<option><?php echo $room['room']; ?></option>
					<?php endif; ?>
				<?php endforeach; ?>
				<?php foreach($labs as $lab): ?>
					<?php if($lab['lab'] == $_GET['opt']) : ?>
						<option selected><?php echo $lab['lab']; ?></option>
					<?php else: ?>
						<option><?php echo $lab['lab']; ?></option>
					<?php endif; ?>
				<?php endforeach; ?>
				</select>
			  </th>
			  <?php 
				foreach($result as $res):
					echo "<th scope=\"col\"> ".$res['period']. "</th>";
				endforeach;
			  ?>
			</tr>
		  </thead>
		  <tbody>
			<tr>
			  <th scope="row thread-dark" >Class</th>
			  <?php 
				foreach($result as $res):
					echo "<th scope=\"col\"> ".$res['class']. "</th>";
				endforeach;
			  ?>	  
			</tr>
			<tr>
			  <th scope="row">Subject</th>
			  <?php 
				foreach($result as $res):
					echo "<th scope=\"col\"> ".$res['subject']. "</th>";
				endforeach;
			  ?>	  
			</tr>
			<tr>
			  <th scope="row">Teacher</th>
			  <?php 
				foreach($result as $res):
					echo "<th scope=\"col\"> ".$res['teacher']. "</th>";
				endforeach;
			  ?>	  
			</tr>
		  </tbody>
		</table>
	</div>
