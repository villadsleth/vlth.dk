<?php

include_once ('includes/ajax.include.php');
include_once ('includes/ajax-gallery.php');
include_once ('includes/meta.include.php');
// include_once ('includes/post-type--gallery.inc.php');
// include_once ('includes/custom-post-type.include.php');


add_filter('json_prepare_post', 'json_api_encode_acf');

function json_api_encode_acf($post) {

    $acf = get_fields($post['ID']);

    if (isset($post)) {
      $post['acf'] = $acf;
    }

    return $post;

}

function my_scripts() {
    wp_localize_script(
        'my-scripts',
        'myLocalized',
        array(
            'partials' => trailingslashit( get_template_directory_uri() ) . 'partials/'
            )
    );
}
add_action( 'wp_enqueue_scripts', 'my_scripts' );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

function theme_local_scripts() {
    wp_enqueue_script( 'modernizr-custom', get_stylesheet_directory_uri()."/js/modernizr-custom.js", array(), filemtime(get_stylesheet_directory()."/js/modernizr-custom.js"), true);
}
add_action( 'wp_enqueue_scripts', 'theme_name_scripts' );
add_action( 'wp_enqueue_scripts', 'theme_local_scripts' );

$localurl = 'vagrantpress.local';
$productionurl = 'vlth.dk';
if($_SERVER['SERVER_NAME'] == $productionurl){
  function theme_prod_scripts() {
    wp_enqueue_style( 'vendor', get_stylesheet_directory_uri()."/vendor.min.css", array(), filemtime(get_stylesheet_directory()."/vendor.min.css"), false);
    wp_enqueue_style( 'style', get_stylesheet_directory_uri()."/style.min.css", array(), filemtime(get_stylesheet_directory()."/style.min.css"), false);
    wp_enqueue_script( 'site', get_stylesheet_directory_uri()."/js/vendor.min.js", array(), filemtime(get_stylesheet_directory()."/js/vendor.min.js"), true);
    wp_enqueue_script( 'angular-animate', 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-animate.min.js', array(), '1.6.5', true );
    wp_enqueue_script( 'app', get_stylesheet_directory_uri()."/js/app.min.js", array(), filemtime(get_stylesheet_directory()."/js/app.min.js"), true);
  }
  add_action( 'wp_enqueue_scripts', 'theme_prod_scripts' );
} else {
  function theme_dev_scripts() {
    wp_enqueue_style( 'vendor', get_stylesheet_directory_uri()."/vendor.css", array(), filemtime(get_stylesheet_directory()."/vendor.css"), false);
    wp_enqueue_style( 'style', get_stylesheet_directory_uri()."/style.css", array(), filemtime(get_stylesheet_directory()."/style.css"), false);
    wp_enqueue_script( 'site', get_stylesheet_directory_uri()."/js/vendor.js", array(), filemtime(get_stylesheet_directory()."/js/vendor.js"), true);
    wp_enqueue_script( 'angular-animate', 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-animate.js', array(), '1.6.5', true );
    wp_enqueue_script( 'app', get_stylesheet_directory_uri()."/js/app.js", array(), filemtime(get_stylesheet_directory()."/js/app.js"), true);
  }
  add_action( 'wp_enqueue_scripts', 'theme_dev_scripts' );
}

/**
 * Proper way to enqueue scripts and styles
 */
function theme_name_scripts() {
    // wp_enqueue_script( 'angular', 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min.js', array(), '1.5.8', true );
    // wp_enqueue_script( 'angular-ui-router', 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.min.js', array(), '1.0.3', true );

}

// wp_localize_script('scripts', 'localized', array('partials' => get_stylesheet_directory_uri() . "/partials"));




// get image path function
function get_image($img_file){
    echo get_stylesheet_directory_uri()."/assets/images/".$img_file;
}

function get_plugin($plugin){
    plugin_dir_url()."/".$plugin;
}

function debug_to_console( $data ) {

    if ( is_array( $data ) )
        $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
    else
        $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

    echo $output;
}

/**
 **  API security
 **/
add_filter( 'rest_endpoints', function( $endpoints ){
    if ( isset( $endpoints['/wp/v2/users'] ) ) {
        unset( $endpoints['/wp/v2/users'] );
    }
    if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
    }
    return $endpoints;
});

/**
 * Only allow GET requests
 */
add_action( 'rest_api_init', function() {

	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function( $value ) {
		$origin = get_http_origin();
		if ( $origin ) {
			header( 'Access-Control-Allow-Origin: ' . esc_url_raw( $origin ) );
		}
		header( 'Access-Control-Allow-Origin: ' . esc_url_raw( site_url() ) );
		header( 'Access-Control-Allow-Methods: GET' );

		return $value;

	});
}, 15 );

add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
    add_theme_support( 'woocommerce' );
}


/**
 * Enable theme support for standard features.
 */
add_theme_support( 'post-thumbnails' );
add_theme_support( 'automatic-feed-links' );


/**
 * Enable shortcodes for widgets.
 */
add_filter( 'widget_text', 'do_shortcode' );


/**
 * Register menus.
 */
register_nav_menus( array(
  'header_primary' 	=> __( 'Header Primary Menu', 'MarokkV2' ),
  'header_secondary' 	=> __( 'Header Secondary Menu', 'MarokkV2' ),
  'footer' 	=> __( 'footer', 'MarokkV2' )
) );


/**
 * woocommerce
 */
// Remove the sorting dropdown from Woocommerce
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
// Remove the result count from WooCommerce
remove_action( 'woocommerce_before_shop_loop' , 'woocommerce_result_count', 20 );
