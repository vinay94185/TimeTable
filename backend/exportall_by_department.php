<?php require_once('common/functions.php');
      require_once('vendor/autoload.php');

  use PhpOffice\PhpSpreadsheet\Spreadsheet;
  use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

  require_once('common/sheetfunctions.php');

  $departments = get_by_sql("SELECT * from departments");
 
  $keys = ["Period ", "0","1","2","3","4","5","6","7","8"];
  $tables = [];
  
  foreach($departments as $department)
  {
    $classes = get_by_sql("SELECT * from classes where dept=:dept",["dept" => $department['dept']]);
    $table = [];
    foreach($classes as $row) {
      $periods = get_by_sql("SELECT * FROM `timetable` where class='".$row['class']."' ORDER BY period");
      if(empty($periods)) continue;
      $table[] = getCustomRow($periods,$row['class']);
    }
    $tables[] = $table;
  }

  $spreadsheet = new Spreadsheet();

  for($i = 0; $i < count($tables); $i++) {

    $sheet = $spreadsheet -> getActiveSheet();
    $sheet->setCellValue('A1', 'Time Table For ' . $departments[$i]['dept']);
    $sheet->fromarray($keys,NULL,'A2');
    $sheet->fromarray($tables[$i],NULL,'A3');

    $sheet -> setTitle($departments[$i]['dept']);
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