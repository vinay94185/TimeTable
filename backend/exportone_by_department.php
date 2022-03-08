<?php require_once('common/functions.php');
      require_once('vendor/autoload.php');

  use PhpOffice\PhpSpreadsheet\Spreadsheet;
  use PhpOffice\PhpSpreadsheet\Writer\Xlsx;   

  require_once('common/sheetfunctions.php');

  if(!isset($_GET['item'])) {
    die();
  }

  $selected = $_GET['item'];

  $classes = get_by_sql("SELECT DISTINCT class from timetable where dept=:dept",['dept' => $selected]);
  $keys = ["Period ", "0","1","2","3","4","5","6","7","8"];
  $weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  $tables = [];

  foreach($classes as $row) {

    $table = [];
    foreach($weekDays as $day) {
      $result = get_by_sql("SELECT * FROM `timetable` where class='".$row['class']."' AND day='$day' ORDER BY period");
      if(!empty($result)) {
        $table[] = getTableRow($result,$day,"classWiseRow");
      }
    }
      
    $tables[] = $table;
  }

  $spreadsheet = new Spreadsheet();

  for($i = 0; $i < count($tables); $i++) {

    $sheet = $spreadsheet -> getActiveSheet();
    $sheet->setCellValue('A1', 'Time Table For ' . $classes[$i]['class']);
    $sheet->fromarray($keys,NULL,'A2');
    $sheet->fromarray($tables[$i],NULL,'A3');

    $sheet -> setTitle($classes[$i]['class']);
    style_table($sheet);
    $spreadsheet->createSheet();
    $spreadsheet->setActiveSheetIndex( $spreadsheet -> getSheetCount() - 1 );
  }

  $spreadsheet->removeSheetByIndex($spreadsheet -> getSheetCount() - 1);
  $spreadsheet -> setActiveSheetIndex(0);

  $writer = new Xlsx($spreadsheet);
  $writer->save('Export_department_wise.xlsx');

  header('location:Export_department_wise.xlsx');
?>