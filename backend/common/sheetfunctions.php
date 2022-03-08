<?php

require_once(__DIR__ .'/../vendor/autoload.php');

use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use \PhpOffice\PhpSpreadsheet\Cell\Coordinate;

function style_table($sheet) {

$borders =  [ 'allBorders' => [ 'borderStyle' => Border::BORDER_MEDIUM , 'color' => [ 'rgb' => '000000' ] ] ];
$textCenter = array(
    'alignment' => array(
        'horizontal' => Alignment::HORIZONTAL_CENTER,
    ),
);
$textheading = array(
    'alignment' => array(
        'horizontal' => Alignment::HORIZONTAL_CENTER,
    ),
    'font' => array(
      'bold' => TRUE,
      'size' => 18,
    )
);

$highestColumn = $sheet -> getHighestDataColumn();
$highestRow = $sheet -> getHighestDataRow();

for($col = 1;$col <= Coordinate::columnIndexFromString($highestColumn);++$col) {
  for($row = 2;$row <= $highestRow; ++$row) {
    $style = $sheet -> getstyle( Coordinate::stringFromColumnIndex($col) . $row );
    $style -> getBorders() -> applyFromArray($borders);
  }
}

foreach(range('A',$highestColumn) as $column) {
  $sheet->getColumnDimension($column)->setWidth(15);
}

$sheet->getRowDimension(1)->setRowHeight(30);
for($row = 3; $row <= $highestRow;++$row) {
  $sheet->getRowDimension($row)->setRowHeight(50);
}


$sheet -> mergeCells('A1:J1');
$sheet->getStyle("A1:J1")->applyFromArray($textheading);
$sheet->getStyle("A2:".$highestColumn.$highestRow)->applyFromArray($textCenter);
}

function getSpecificRow($result, $row_name, $alt = "") {
  $row = [];
  $row[] = ucfirst($row_name);

  for($i=0,$c=0; $i<9;++$i) {	
    if($c >= count($result)) $c--;
    $data = $result[$c];
    if($data['period'] == $i) $c++;
    else $data = [];				

    if($data != []) {
      if($alt) $row[] = ($data[$row_name] == 0 || $data[$row_name] == "") ? $data[$alt] : $data[$row_name];
      else $row[] = $data[$row_name];
    } 
    else {
      $row[] = " ";
    }
  }
  return $row;
}


function getTableRow($result, $WeekDay,$mode) {
  $row = [];
  $row[] = ucfirst($WeekDay);

  for($i=0,$c=0; $i<9;++$i) {	
    if($c >= count($result)) $c--;
    $data = $result[$c];
    if($data['period'] == $i) $c++;
    else $data = [];				

    if($data != []) {
      $room = $data['lab'] !== null? $data['lab'] : $data['room'];
      $row[] = $mode($data);
    } else {
      $row[] = " ";
    }
  }
  return $row;
}

function classWiseRow($data) {
  $room = $data['lab'] !== null? $data['lab'] : $data['room'];
  return $data['subject'] . "\n" . $data['teacher'] . "\n" . $room;
}

function teacherWiseRow($data) {
  $room = $data['lab'] !== null? $data['lab'] : $data['room'];
  return $data['subject'] . "\n" . $data['class'] . "\n" . $room;
}

function roomWiseRow($data) {
  return $data['subject'] . "\n" . $data['teacher'] . "\n" . $data['class'];
}


function getCustomRow($result,$classname) {
  $row = [];
  $row[] =  ucfirst($classname);

  for($i=0,$c=0; $i<9;++$i) {	
    if($c >= count($result)) $c--;
    $data = $result[$c];
    if($data['period'] == $i) $c++;
    else $data = [];

    if($data != []) {
      $subject = $data['subject'];
      $teacher = $data['teacher'];
      $room = ($data['room'] == 0) ? $data['lab'] : $data['room'];

      $row[] = "$subject \n$teacher \n$room";
    } 
    else {
      $row[] = " ";
    }
  }
  return $row;
}

?>