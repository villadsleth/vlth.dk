<?php
/*
Template Name: Index
*/
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
<!--

-->
  <head>
    <meta name="fragment" content="!">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

    <meta charset="<?php bloginfo('charset'); ?>">
    <title><?php $social_media_title = $_SERVER['SERVER_NAME']; echo $social_media_title ?></title>
    <!-- meta -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1, user-scalable=0">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.3/js/tether.min.js"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-44877745-1"></script>
    <script>
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // if(location.host.split('.')[1] == 'dk'){
    // 	gtag('config', 'UA-44877745-1');
    // } else if (location.host.split('.')[1] == 'com') {
    //   gtag('config', 'UA-112475191-1');
    // }
    //
    </script>
    <!-- css -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.3/js/tether.min.js"></script>
    <?php wp_head(); ?>
  </head>

  <body <?php body_class();?>>
    <!-- Navigation -->
    <nav class="navbar custom navbar-expand-lg navbar-dark bg-dark" ng-controller="Menu">
      <div class="row">
      <div class="col-md-12">

      <a class="navbar-brand" href="/">
      VLTH.DK
      </a>
      <div class="float-right text-right" style="margin-top:11px">
        <!-- <a href="https://instagram.com/villads_leth" target="_blank" >
        <i class="fa fa-instagram fa-2x" aria-hidden="true"></i>
        </a> -->
      </div>

      </div>
        <div class="col-md-12">
          <div class="col-md-2 nopadding" style="float:left">
            <ul class="navbar-nav" ng-hide="!loaded" >
              <li class="nav-link ng-cloak" ng-repeat="m in menu" ng-hide="!loaded" trust-as-html="m.title">
                <a href="{{m.url}}">
                {{m.title}}
                </a>
                <ul class="nested-menu nested-menu-{{$index}}" ng-hide="!m.children.length">
                  <li class="nav-link nested ng-cloak" ng-repeat="m in m.children" ng-hide="!loaded" >
                    <a href="{{m.url}}">
                      {{m.title}}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="col-md-8 nopadding" style="float:left">
          </div>
          <div class="col-md-2 nopadding text-right" style="float:left; line-height:20px; font-size:13px;margin-top:-4px">
            <div style="display:inline;font-weight: 950;font-size: 115%;color:#e8af00;">
            <!-- - -->
            </div>
          </div>
        </div>
      </div>
    </nav>


    <footer id="footer">
      <?php wp_footer(); ?>


      </script>
    </footer>

  </body>
</html>
