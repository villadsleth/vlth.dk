<?php
/*
Template Name: Frontpage
*/
?>

<?php get_header(); ?>

    <!-- Page Content -->
    <section class="section-front {{nav}} ng-cloak">
      <div id="fullpage" ng-controller="postsCtrl">
        <div class="section">
          <div class="slide" ng-repeat="p in posts"  ng-hide="!loaded">
            <iframe ng-src="{{p.acf.video | embedYT}}" width="100%" height="100%" ng-hide="!p.acf.video.length  || p.better_featured_image.length" frameborder="0" style="border: 0;"></iframe>
            <img ng-src="{{p.better_featured_image.source_url}}" alt="{{p.better_featured_image.alt_text}}" ng-hide="!p.better_featured_image" style=" width: 100vw;  height: 100vh;  object-fit: cover;">
          </div>
        </div>
      </div>
    </section>

<?php get_footer(); ?>
