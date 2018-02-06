<?php
add_action( 'wp_ajax_nopriv_jsonResponse', 'jsonResponse' );
add_action( 'wp_ajax_jsonResponse', 'jsonResponse' );

function jsonResponse($status, $message = "", $data = NULL) {
	$response = json_encode(
		array(
			'status' => $status,
			'message' => $message,
			'data' => $data
		)
	);
	echo $response;
	exit;
}