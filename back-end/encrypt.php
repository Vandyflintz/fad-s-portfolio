<?php
require_once("sodium/autoload.php");
function encrypt($data){
    $key = base64_decode("QvE4NZsao8lytIGKz5366J2rNs+0g9LAXeQW3THMBzQ=");
    $nonce = base64_decode("ERSP0XTUv8Toxs8uAmk789In9K30yfmx");
    $ciphertext = sodium_crypto_secretbox($data, $nonce, $key);
    return base64_encode($nonce . $ciphertext);
}
function decrypt($encryptedData){
    $decoded =  base64_decode($encryptedData);
    $key = base64_decode("QvE4NZsao8lytIGKz5366J2rNs+0g9LAXeQW3THMBzQ=");
    $nonce = base64_decode("ERSP0XTUv8Toxs8uAmk789In9K30yfmx");
    $ciphertext = substr($decoded, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, strlen($decoded));
    $plaintext = sodium_crypto_secretbox_open($ciphertext, $nonce, $key);
    if ($plaintext === false) {
        throw new Exception('Invalid ciphertext');
    }
    return $plaintext;
}



?>