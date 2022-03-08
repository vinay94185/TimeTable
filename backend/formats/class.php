<?php 
	require(dirname(__FILE__) . '/../common/functions.php');
		
	$classses = get_by_sql('SELECT DISTINCT class FROM `timetable`');

	$class;
	if(!empty($classses) > 0) $class = $classses[0]['class'];
	else $class = "";
	
	if(isset($_GET['opt'])) {
		if($_GET['opt'] != "")
			$class = $_GET['opt'];		
	}

	$result = get_by_sql("Select * from timetable where class=:class order by period",[ 'class' => $class ]);	
?>

	<div class="table-responsive">
		 <table class="table table-hover table-bordered">
		  <thead class="thead-dark">
			<tr>
			  <th scope="col">
				<select onChange="onClassChange(this);">
					<option> _____ </option>
				<?php foreach($classses as $cls): ?>
					<?php if($cls['class'] == $class ) : ?>
						<option selected> <?php echo $cls['class']; ?></option>
					<?php else: ?>
						<option><?php echo $cls['class']; ?></option>
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
			  <th scope="row thread-dark" >Teacher</th>
			  <?php 
				foreach($result as $res):
					echo "<th scope=\"col\"> ".$res['teacher']. "</th>";
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
