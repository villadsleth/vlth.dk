<?php
add_action( 'wp_ajax_nopriv_getGallery', 'getGallery' );
add_action( 'wp_ajax_getGallery', 'getGallery' );

function getGallery() {
    $data = get_field('gallery_images', 2062);
    $succes = ($data ? 1 : 0);

    $response = json_encode(
        array(
            'success' => $succes,
            'data' => $data
        )
    );
    echo $response;
    exit;
}
?>