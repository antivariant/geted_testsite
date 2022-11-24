<?php

$api_film_endpoint = 'http://api:8080/film';

$curl = curl_init($api_film_endpoint);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type:application/json'
]);

$response = curl_exec($curl);
curl_close($curl);
 //echo $response;

$json = json_decode($response,true);
foreach ($json['data'] as $film) {
    // echo '<div class="product">';
    // echo '<div class="film_id"><span class="label">ID:</span>' . $film['id'] .'</div>';
    // echo '<div class="film_title"><span class="label">Title:</span>' . $film['title'] .'</div>';
    // echo '<div class="film_year"><span class="label">Year:</span>' . $film['year'] .'</div>';
    // echo '<div class="film_actors"><span class="label">Actors:</span>' . $film['name'] .'</div>';
    // echo '</div>';
    // echo '</br>';
    echo '<form>';
    
    echo '</form>';
}

?>