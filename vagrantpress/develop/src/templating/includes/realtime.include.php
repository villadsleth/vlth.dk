<?php
include_once ('google-api-php-client/src/Google/autoload.php');

set_include_path('google-api-php-client/src/' . PATH_SEPARATOR . get_include_path());
require_once 'google-api-php-client/src/Google/Client.php';
require_once 'google-api-php-client/src/Google/Auth/OAuth2.php';
require_once 'google-api-php-client/src/Google/Service/Analytics.php';

$CLIENT_ID = '903722664163-pl9tjt41hjrbirvmcq63cim9dca87bgt.apps.googleusercontent.com';
$CLIENT_EMAIL = '903722664163-pl9tjt41hjrbirvmcq63cim9dca87bgt@developer.gserviceaccount.com';
$SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
$KEY_FILE = 'key2.p12';
$GA_VIEW_ID = 'ga:66845026';

$client = new Google_Client();
$client->setClientId($CLIENT_ID);
// $client->setAssertionCredentials(
//     new Google_Auth_AssertionCredentials(
//         $CLIENT_EMAIL,
//         array($SCOPE),
//         file_get_contents($KEY_FILE)
//     )
// );

$service = new Google_Service_Analytics($client);
// try {
//     $result = $service->data_realtime->get(
//         $GA_VIEW_ID,
//         'rt:activeVisitors'
//     );
//     // print_r($result->totalsForAllResults['rt:activeVisitors']);
// } catch(Exception $e) {
//     var_dump($e);
// }