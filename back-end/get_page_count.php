<?php
require_once 'vendor/autoload.php'; // Include the Composer autoloader

use Mpdf\Mpdf;
use PhpOffice\PhpPresentation\IOFactory as PresentationIOFactory;
use PhpOffice\PhpSpreadsheet\IOFactory as SpreadsheetIOFactory;
use PhpOffice\PhpWord\IOFactory as WordIOFactory;

function getFilePageCount($url) {
    $fileContent = file_get_contents($url);
    $maxPages = 0;
    $lines = explode("\n", $fileContent);
    
    foreach ($lines as $line) {
        if (preg_match('/\/Count\s+(\d+)/', $line, $matches)) {
            $count = intval($matches[1]);
            if ($count > $maxPages) {
                $maxPages = $count;
            }
        }
    }
    
    return $maxPages;
}

function getWordPageCount($url){
    $localPath = urlToLocalPath($url);
    $zip = new \PhpOffice\PhpWord\Shared\ZipArchive();
    $zip->open($localPath);
    $xml = new \DOMDocument();
    $xml->loadXML($zip->getFromName("docProps/app.xml"));
    
    /* Echoes number of pages according to app.xml */
    return $xml->getElementsByTagName('Pages')->item(0)->nodeValue;
   // return $pageCount;
}
function getExcelPageCount($url){
    $localPath = urlToLocalPath($url);    
$spreadsheet = SpreadsheetIOFactory::load($localPath);

// Get the number of sheets
$sheetCount = $spreadsheet->getSheetCount();
    return $sheetCount;  
}

function getPPtPageCount($url){
    $localPath = urlToLocalPath($url);
    $presentation = PresentationIOFactory::load($localPath);

    // Get the number of slides
    $slideCount = $presentation->getSlideCount();  
    return $slideCount; 
}

function urlToLocalPath($url) {
    $parsedUrl = parse_url($url);
    $path = $parsedUrl['path'];

    $documentRoot = $_SERVER['DOCUMENT_ROOT'];
    $localPath = rtrim($documentRoot, '/') . $path;

    return $localPath;
}

if (isset($_GET['url'])) {
    $url = $_GET['url'];
    
    $fileExtension = strtolower(pathinfo($url, PATHINFO_EXTENSION));
    if($fileExtension=="pdf"){
        $pageCount = getFilePageCount($url);
    }
    if($fileExtension=="ppt" || $fileExtension=="pptx"){
        $pageCount = getPPtPageCount($url);
    }
    if($fileExtension=="doc" || $fileExtension=="docx" || $fileExtension=="rtf"){
        $pageCount = getWordPageCount($url);
    }
    if($fileExtension=="xls" || $fileExtension=="xlsx"){
        $pageCount = getExcelPageCount($url);
    }
    echo $pageCount;
}
?>
