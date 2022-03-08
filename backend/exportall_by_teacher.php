<?php require_once('common/functions.php');
      require_once('vendor/autoload.php');

  use PhpOffice\PhpSpreadsheet\Spreadsheet;
  use PhpOffice\PhpSpreadsheet\Writer\Xlsx;   

  require_once('common/sheetfunctions.php');

  $teachers = get_by_sql("SELECT DISTINCT teacher from timetable");
  $keys = ["Period ", "0","1","2","3","4","5","6","7","8"];
  $weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  $tables = [];

  foreach($teachers as $row) {
    $table = [];
    foreach($weekDays as $day) {
      $result = get_by_sql("SELECT * FROM `timetable` where teacher='".$row['teacher']."' AND day='$day' ORDER BY period");
      if(!empty($result)) {
        $table[] = getTableRow($result,$day,"teacherWiseRow");
      }
    }
    $tables[] = $table;
  }

  $spreadsheet = new Spreadsheet();

  for($i = 0; $i < count($tables); $i++) {

    $sheet = $spreadsheet -> getActiveSheet();
    $sheet->setCellValue('A1', 'Time Table For ' . $teachers[$i]['teacher']);
    $sheet->fromarray($keys,NULL,'A2');
    $sheet->fromarray($tables[$i],NULL,'A3');

    $sheet -> setTitle($teachers[$i]['teacher']);
    style_table($sheet);
    $spreadsheet->createSheet();
    $spreadsheet->setActiveSheetIndex( $spreadsheet -> getSheetCount() - 1 );
  }

  $spreadsheet->removeSheetByIndex($spreadsheet -> getSheetCount() - 1);
  $spreadsheet -> setActiveSheetIndex(0);

  $writer = new Xlsx($spreadsheet);
  $writer->save('Export_teacher_wise.xlsx');

  header('location:Export_teacher_wise.xlsx');
?>