<?php require_once('common/functions.php');
      require_once('vendor/autoload.php');

  use PhpOffice\PhpSpreadsheet\Spreadsheet;
  use PhpOffice\PhpSpreadsheet\Writer\Xlsx;   

  require_once('common/sheetfunctions.php');

  if(!isset($_GET['item'])) {
    die();
  }

  $selected = $_GET['item'];
  $keys = ["Period ", "0","1","2","3","4","5","6","7","8"];
  $weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


  foreach($weekDays as $day) {
    $result;
    if(is_numeric($selected)) $result = get_by_sql("SELECT * FROM `timetable` where room='$selected' AND day='$day' ORDER BY period");
    else $result = get_by_sql("SELECT * FROM `timetable` where lab='$selected' AND day='$day' ORDER BY period");  
    if(!empty($result)) {
      $table[] = getTableRow($result,$day,"roomWiseRow");
    }
  }

  $spreadsheet = new Spreadsheet();

  $sheet = $spreadsheet -> getActiveSheet();
  $sheet->setCellValue('A1', 'Time Table For ' . $selected);
  $sheet->fromarray($keys,NULL,'A2');
  $sheet->fromarray($table,NULL,'A3');

  $sheet -> setTitle( "Room ". $selected);
  style_table($sheet);

  $writer = new Xlsx($spreadsheet);
  $writer->save('Export_room_wise.xlsx');

  header('location:Export_room_wise.xlsx');
?>