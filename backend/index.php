<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Кінуха</title>
<?php
    include 'inc/bootstrap_h.php';
    include 'inc/gtm_h.php';
?>

</head>
<body>
<?php
    include 'inc/navbar.php';
?>


    <div class="container">
<?php
    include 'inc/gtm_b.php';
    include 'inc/bootstrap_b.php';
?>

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
echo '<div class="row row-cols-2 gy-2">';
$json = json_decode($response,true);
foreach ($json['data'] as $film) {
    echo '<div class="col">';
    include 'inc/film.php';
    echo '</div>';

}
echo '</div>'

?>

</div>
</body>
</html>
