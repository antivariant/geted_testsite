<?php

$api_film_endpoint = 'http://api:8080/film';

$curl = curl_init($api_film_endpoint);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type:application/json'
]);

$response = curl_exec($curl);
curl_close($curl);
echo $response;

?>