<?php require_once('common/functions.php');
      require_once('vendor/autoload.php');

  use PhpOffice\PhpSpreadsheet\Spreadsheet;
  use PhpOffice\PhpSpreadsheet\Writer\Xlsx;   

  require_once('common/sheetfunctions.php');

  $rooms = get_by_sql("SELECT DISTINCT room from timetable UNION SELECT DISTINCT lab from timetable");

  $del_val = "0";
  $tmp = $rooms;
  $rooms = [];

  foreach($tmp as $row) {
    if($row['room'] == '0' || $row['room'] == "") continue;
    else $rooms[] = $row;
  }

  $keys = ["Period ", "0","1","2","3","4","5","6","7","8"];
  $weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  $tables = [];

  foreach($rooms as $row) {
    $table = [];
    foreach($weekDays as $day) {
      $result;
      if(is_numeric($row['room'])) 
        $result = get_by_sql("SELECT * FROM `timetable` where room='".$row['room']."' AND day='$day' ORDER BY period");
      else $result = get_by_sql("SELECT * FROM `timetable` where lab='".$row['room']."' AND day='$day' ORDER BY period");  

      if(!empty($result)) {
        $table[] = getTableRow($result,$day,"roomWiseRow");
      }
    }

    $tables[] = $table;
  }

  $spreadsheet = new Spreadsheet();

  for($i = 0; $i < count($tables); $i++) {

    $sheet = $spreadsheet -> getActiveSheet();
    $sheet->setCellValue('A1', 'Time Table For ' . $rooms[$i]['room']);
    $sheet->fromarray($keys,NULL,'A2');
    $sheet->fromarray($tables[$i],NULL,'A3');

    $sheet -> setTitle( "Room ". $rooms[$i]['room']);
    style_table($sheet);
    $spreadsheet->createSheet();
    $spreadsheet->setActiveSheetIndex( $spreadsheet -> getSheetCount() - 1 );
  }

  $spreadsheet->removeSheetByIndex($spreadsheet -> getSheetCount() - 1);
  $spreadsheet -> setActiveSheetIndex(0);

  $writer = new Xlsx($spreadsheet);
  $writer->save('Export_room_wise.xlsx');

  header('location:Export_room_wise.xlsx');
?>