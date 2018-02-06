<?php
/* Admin bar true/false */
admin_bar(false);
function admin_bar($show) {
    if($show) {
        add_action('get_header', 'my_filter_head');
        function my_filter_head() { remove_action('wp_head', '_admin_bar_bump_cb'); }
         
        function my_admin_css() {
        if ( is_user_logged_in() ) {
            ?>
            <style type="text/css">
                #wpadminbar {
                    width: 47px;
                    min-width: 47px;
                    overflow: hidden;
                    -webkit-transition: .4s width;
                    -webkit-transition-delay: 1s;
                    -moz-transition: .4s width;
                    -moz-transition-delay: 1s;
                    -o-transition: .4s width;
                    -o-transition-delay: 1s;
                    -ms-transition: .4s width;
                    -ms-transition-delay: 1s;
                    transition: .4s width;
                    transition-delay: 1s;
                }
                
                #wpadminbar:hover {
                    width: 100%;
                    overflow: visible;
                    -webkit-transition-delay: 0;
                    -moz-transition-delay: 0;
                    -o-transition-delay: 0;
                    -ms-transition-delay: 0;
                    transition-delay: 0;
                }
            </style>
            <?php }
        }
        add_action('wp_head', 'my_admin_css');
    } else {
        add_filter('show_admin_bar', '__return_false');
    }
}

/* Enable thumbnails to post & page */
add_theme_support('post-thumbnails', array('post', 'page'));

/* Register menu */
register_nav_menus( array(
    'primary' => __( 'Primary Menu', 'Main navigation' ),
) );

/* Remove auto added p-tags */
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

/* Don't compress uploads */
add_filter('jpeg_quality', 'jpeg_quality_callback');
function jpeg_quality_callback($arg) {
    return (int)100;
}

/* Responsive times. Images should always be max-width:100% */
add_filter( 'post_thumbnail_html', 'remove_width_attribute', 10 );
add_filter( 'image_send_to_editor', 'remove_width_attribute', 10 );
function remove_width_attribute( $html ) {
   $html = preg_replace( '/(width|height)="\d*"\s/', "", $html );
   return $html;
}

/* Object to array */
function object_to_array($data)
{
    if (is_array($data) || is_object($data)) {
        $result = array();
        foreach ($data as $key => $value) {
            $result[$key] = object_to_array($value);
        }
        return $result;
    }
    return $data;
}

/* Sanitize filenames */
add_filter('sanitize_file_name', 'clean_filename', 10);
function clean_filename($string) {
    $string = str_replace("æ", "ea", $string);
    $string = str_replace("ø", "oe", $string);
    $string = str_replace("å", "aa", $string);
    $string = str_replace("Æ", "ea", $string);
    $string = str_replace("Ø", "oe", $string);
    $string = str_replace("Å", "aa", $string);
    
    $string = str_replace(" ", "_", $string);
    $string = str_replace("..", ".", $string);
    $string = strtolower($string);

    preg_match_all("/[^0-9^a-z^_^.]/", $string, $matches);
    foreach ($matches[0] as $value) {
            $string = str_replace($value, "", $string);
    }
    return $string;
}

/* Make sure that we replace current site_url from postcontent on save - avoid links and images pointing to staging/dev server */
add_filter('content_save_pre','thisismyurl_clean_static_url','99');
function thisismyurl_clean_static_url($content) {
    $content = str_ireplace('src=\"'.get_bloginfo('url'), 'src=\"', $content );
    return str_ireplace('href=\"'.get_bloginfo('url'), 'href=\"', $content );
}

/* Themed login page */
add_action( 'login_enqueue_scripts', 'login_stylesheet' );
function login_stylesheet() { 
    ?>
    <link rel="stylesheet" id="custom_wp_admin_css"  href="<?php echo get_bloginfo( 'stylesheet_directory' ) . '/css/login-page.css'; ?>" type="text/css" media="all" />
<?php }
