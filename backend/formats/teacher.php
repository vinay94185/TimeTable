<?php require(dirname(__FILE__) . '/../common/functions.php');
		
	$teachers = get_by_sql('SELECT DISTINCT teacher FROM `timetable`');
	
	if(!empty($classes)) $teacher = $teachers[0]['teacher'];
	else $teacher = "";
	
	if(isset($_GET['opt'])) {
		if($_GET['opt'] != "")
			$teacher = $_GET['opt'];
	}
	
	$result = get_by_sql("Select * from timetable where teacher=:teacher order by period",[ 'teacher' => $teacher ]);
?>

	<div class="table-responsive">
		 <table class="table table-hover table-bordered">
		 <thead class="thead-dark">
			<tr>
			  <th scope="col">
				<select onChange="onClassChange(this);">
				<?php foreach($teachers as $teacher): ?>
					<?php if($teacher['teacher'] == $_GET['opt']) : ?>
						<option selected> <?php echo $teacher['teacher']; ?></option>
					<?php else: ?>
						<option><?php echo $teacher['teacher']; ?></option>
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
			  <th scope="row">Room</th>
			  <?php 
				foreach($result as $res):
					$roomno = ($res['room'] != 0) ? $res['room'] : $res['lab'];
					echo "<th scope=\"col\"> ".$roomno. "</th>";
				endforeach;
			  ?>	  
			</tr>
		  </tbody>
		</table>
	</div>
