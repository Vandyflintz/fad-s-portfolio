<?php
$allowedReferers = array(
    'http://www.emkapp.com/fad_s_portfolio/pages/index.html',
    'http://172.20.10.4/fad_s_portfolio/front-end/index.html',
    'http://www.emkapp.com/fad_s_portfolio/pages/',
	'http://www.emkapp.com/fad_s_portfolio/pages/dashboard.html'
);

if ($_SERVER['SCRIPT_FILENAME'] === __FILE__ || !isset($_SERVER['HTTP_REFERER']) || !in_array($_SERVER['HTTP_REFERER'], $allowedReferers)) {
    header('HTTP/1.0 403 Forbidden');
    exit;
}
header('Content-Type: application/json');

$serverDateTime = date('Y-m-d H:i:s');

$response = [
    'serverDateTime' => $serverDateTime
];

echo json_encode($response);
?>
