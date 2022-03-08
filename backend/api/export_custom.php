<?php require_once(__DIR__ . '/../common/functions.php');
      require_once(__DIR__ . '/../vendor/autoload.php');

  use PhpOffice\PhpSpreadsheet\Spreadsheet;
  use PhpOffice\PhpSpreadsheet\Writer\Xlsx;   

  require_once(__DIR__ . '/../common/sheetfunctions.php');

  $json = file_get_contents('php://input');
  $classes = json_decode($json,true);

  $keys = ["Period ", "0","1","2","3","4","5","6","7","8"];
  $weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  $tables = [];

  foreach($classes as $class) {

    $table = [];
    foreach($weekDays as $day) {
      $result = get_by_sql("SELECT * FROM `timetable` where class='$class' AND day='$day' ORDER BY period");
      if(!empty($result)) {
        $table[] = getTableRow($result,$day,"classWiseRow");
      }
    }
      
    $tables[] = $table;
  }

  $spreadsheet = new Spreadsheet();

  for($i = 0; $i < count($tables); $i++) {

    $sheet = $spreadsheet -> getActiveSheet();
    $sheet->setCellValue('A1', 'Time Table For ' . $classes[$i]);
    $sheet->fromarray($keys,NULL,'A2');
    $sheet->fromarray($tables[$i],NULL,'A3');

    $sheet -> setTitle($classes[$i]);
    style_table($sheet);
    $spreadsheet->createSheet();
    $spreadsheet->setActiveSheetIndex( $spreadsheet -> getSheetCount() - 1 );
  }

  $spreadsheet->removeSheetByIndex($spreadsheet -> getSheetCount() - 1);
  $spreadsheet -> setActiveSheetIndex(0);

  $writer = new Xlsx($spreadsheet);
  $writer->save('export_custom.xlsx');

  $file = 'export_custom.xlsx';

    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="export_custom.xlsx"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    }
?>