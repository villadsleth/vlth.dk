<?php

// if post type is needed in your project, move this file to child!

function gallery_post_type() {
  $labels = array(
    'name'               => 'FrontPageVideo',
    'singular_name'      => 'FrontPageVideo',
    'add_new'            => 'Add New',
    'add_new_item'       => 'Add New video',
    'edit_item'          => 'Edit video',
    'new_item'           => 'New video',
    'all_items'          => 'All video',
    'view_item'          => 'View video',
    'search_items'       => 'Search video',
    'not_found'          => 'No video found',
    'not_found_in_trash' => 'No video found in Trash',
    'parent_item_colon'  => '',
    'menu_name'          => 'FrontPageVideo'
  );

  $args = array(
    // http://mannieschumpert.com/blog/using-wordpress-3-8-icons-custom-post-types-admin-menu/
    // http://melchoyce.github.io/dashicons/
    'menu_icon' => 'dashicons-video-alt',
    'labels'             => $labels,
    'public'             => true,
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array( 'slug' => 'FrontPageVideo' ),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => null,
    'show_in_rest'       => true,
    'rest_base'          => 'video-api',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
    'supports'           => array( 'title', 'editor')
  );

  register_post_type( 'frontpagevideo', $args );
}
add_action( 'init', 'gallery_post_type' );
