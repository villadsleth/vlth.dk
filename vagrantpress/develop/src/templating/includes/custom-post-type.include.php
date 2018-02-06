<?php

// if post type is needed in your project, move this file to child!

function work_post_type() {
  $labels = array(
    'name'               => 'work',
    'singular_name'      => 'work',
    'add_new'            => 'Add New',
    'add_new_item'       => 'Add New Work',
    'edit_item'          => 'Edit work',
    'new_item'           => 'New work',
    'all_items'          => 'All work',
    'view_item'          => 'View work',
    'search_items'       => 'Search work',
    'not_found'          => 'No work found',
    'not_found_in_trash' => 'No work found in Trash',
    'parent_item_colon'  => '',
    'menu_name'          => 'work'
  );

  $args = array(
    // http://mannieschumpert.com/blog/using-wordpress-3-8-icons-custom-post-types-admin-menu/
    // http://melchoyce.github.io/dashicons/
    'menu_icon' => 'dashicons-images-alt2',
    'labels'             => $labels,
    'public'             => true,
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array( 'slug' => 'work' ),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => null,
    'show_in_rest'       => true,
    'rest_base'          => 'work-api',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
    'supports'           => array( 'title', 'editor')
  );

  register_post_type( 'work', $args );
}
// add_action( 'init', 'work_post_type' );
