<?php


function dynamicMetaData(){
        $baseurl_childtheme = get_bloginfo('stylesheet_directory');

        global $post;
        //
        $social_media_title = the_title( '', '', false );


        $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];


        if (strpos($url,'.dk') !== false) {
          $social_media_description = 'marokkanske cementfliser og tæpper';
          echo '';
        } else {
          $social_media_description = 'handmade cement tiles from morocco';
          echo '';
        }

        if(strpos($_SERVER['REQUEST_URI'], 'produkt') !== false){
          $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' );
          $social_media_image = $url;
          // echo '';
        } else {
          $social_media_image = $baseurl_childtheme . "/assets/images/meta-".rand(1, 6).".jpg";
        }

        //
        //
        print '<meta name="robots" content="index, follow" />' . "\n";
        print '<meta name="revisit-after" content="7 days">' . "\n";
        print '<meta property="og:url" content="https://'.$_SERVER['SERVER_NAME'].'"/>' . "\n";
        print '<meta property="og:type" content="website" />'. "\n\n";


        if ($social_media_title) {
                print '<meta property="og:title" content="'.$social_media_title.'"/>' . "\n";
                print '<meta name="twitter:title" content="'.$social_media_title.'" />' . "\n";
        }
        if($social_media_description){
                print '<meta property="og:description" content="'.$social_media_description.'" />' . "\n";
                print '<meta name="twitter:description" content="'.$social_media_description.'" />' . "\n";
                print '<meta name="description" content="'.$social_media_description.'" />' . "\n";
        }

        if ($social_media_image) {
                print '<meta property="og:image:url" content="'.$social_media_image.'"/>' . "\n";
                print '<meta property="og:image:width"  content="1200"/' . "\n";
                print '<meta property="og:image:height" content="630"/>' . "\n";
                print '<meta name="twitter:image:src" content="'.$social_media_image.'" />' . "\n";
        }
}

add_action('wp_head', 'dynamicMetaData');
