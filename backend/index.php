<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KHXSNGF');</script>
    <!-- End Google Tag Manager -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Кінуха</title>
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KHXSNGF"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->    
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

</body>
</html>
