console.log('vlth.dk');

// // 'use strict';
// if (typeof console === 'undefined') {
// 	console = {
// 		log: function() {}
// 	};
// }
//
// var checkMobile = function() {
// 	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 600) {
//  		return true;
// 	} else {
// 		return false;
// 	}
// };
//
//
// var parseHtmlEntities = function(str) {
// 	return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
// 		var num = parseInt(numStr, 10); // read num as normal number
// 		return String.fromCharCode(num);
// 	});
// };
//
// var vm = $;
// var $body = $('body');
//
// vm(document).ready(function() {
//
//
// 		setTimeout(function () {
// 			var menu = $('[data-menu]');
// 			var mO = _.filter(menu, function(m){
// 				var t = $(m);
// 				var u = $(t.find('ul'));
// 				return !u.hasClass('ng-hide');
// 			});
// 			$(mO).on('mouseover', function(e){
// 				var $this = $(e.currentTarget);
// 				var ul = $($this.find('ul'));
// 				ul.css('z-index', 5);
// 				if (ul.hasClass('hide')) {
// 					ul.removeClass('hide');
// 				}
// 			}).on('mouseout', function(e){
// 				var $this = $(e.currentTarget);
// 				var ul = $($this.find('ul'));
// 				ul.css('z-index', 4);
// 				if (!ul.hasClass('hide')) {
// 					ul.addClass('hide');
// 				}
// 			});
// 		}, 1000);
//     // (function(d, s, id) {
//     //   var js, fjs = d.getElementsByTagName(s)[0];
//     //   if (d.getElementById(id)) return;
//     //   js = d.createElement(s); js.id = id;
//     //   js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=542496185847331';
//     //   fjs.parentNode.insertBefore(js, fjs);
//     // }(document, 'script', 'facebook-jssdk'));
//
// });
//
// angular
// 	.module('marokk', ['ui.router', 'ngSanitize', 'ngAnimate'])
// 	.config(function($stateProvider, $urlRouterProvider, $locationProvider, $sceDelegateProvider){
// 		$sceDelegateProvider.resourceUrlWhitelist([
//     // Allow same origin resource loads.
//     'self',
//     // Allow loading from our assets domain. **.
//     'https://api.instagram.com/**'
//   ]);
// 	})
// 	.run(['$rootScope', '$timeout', '$location', function($rootScope, $timeout, $location) {
// 			$rootScope.nav = 'minimal';
// 			$rootScope.isMobile = checkMobile();
//
//
// 			var lang = $location.$$host.split('.')[1];
//
//
// 			if (lang === 'dk') {
// 				$rootScope.lang = 'dk';
//
// 			} else {
// 				$rootScope.lang = 'com';
//
// 			}
//
// 			// $timeout(function () {
// 			// 	$rootScope.nav = 'minimal';
// 			// }, 2500);
//
// 			$(document).keypress(function(e) {
// 		    if(e.shiftKey && e.keyCode === 76) {
// 					var url;
// 					if($location.$$path.length > 1){
// 						var path = $location.$$path.split('/')[1];
// 						if (path === 'live' || path === 'news') {
// 							url = "/wp-admin";
// 						} else {
// 							url = "/wp-admin/edit.php?post_type="+path;
// 						}
// 					} else {
// 						url = "/wp-admin";
// 					}
// 				window.open(url, '_blank');
// 		    }
// 			});
// 	}])
// 	.filter('embedSrc', function ($sce) {
//     return function(videoID) {
// 			if (videoID !== '' || videoID === undefined) {
// 				return $sce.trustAsResourceUrl('//player.vimeo.com/video/' + videoID + '?title=0&autoplay=1&loop=1');
// 			}
//     };
//   })
// 	.filter('test', function ($rootScope, $sce) {
//     return function(string) {
// 			if (string !== undefined) {
// 				return parseHtmlEntities(string);
//     	}
// 		};
//   })
// 	.filter('embedYT', function ($sce) {
//     return function(videoID) {
// 			if (videoID !== '' && videoID !== undefined) {
// 				var url = videoID;
// 				var replace = url.split('watch?v=');
// 				var newUrl = replace[0] + 'embed/' + replace[1]+'?&autohide=1&showinfo=0&controls=0';
// 				return $sce.trustAsResourceUrl(newUrl);
// 			}
//     };
//   })
// 	.controller('postsCtrl', function($scope, $location, apiService, $timeout) {
// 		$scope.loaded = false;
// 		apiService.init('posts', function(d){
//
// 			$scope.posts = d;
// 			$scope.loaded = true;
// 			$timeout(init, 100);
// 		});
//
// 		var init = function(){
// 			var fp = $('#fullpage');
// 			fp.fullpage({
// 				resize: true,
// 				loopHorizontal: true,
// 				controlArrows: true,
// 				verticalCentered: true,
// 				paddingBottom: '60px',
// 				parallax: true
// 			});
// 			$('.section-front').removeClass('ng-cloak');
// 		};
// 	})
// 	.controller('singleProduct', function($scope, $location, productService, $rootScope) {
// 		$scope.loaded = false;
// 		var id = $('[data-product]').data('product');
// 		if (id !== undefined) {
// 			productService.init(id, function(d){
// 				var link = d.link;
// 				var cat = link.split('/')[4];
// 				var match = cat.match('zellij') || cat.match('colors-formats');
// 				if (match !== null) {
// 					$rootScope.onlyInfo = true;
// 				}
// 				$scope.product = d;
// 				$scope.loaded = true;
// 				$('[data-related="fade"]').addClass('show');
// 			});
// 			// productService.woo(id, function(d){
//
// 			// 	// $scope.product = d;
// 			// });
// 		}
// 	})
// 	.controller('Menu', function($scope, $location, $rootScope, menuService) {
//
// 		$scope.toggle = false;
// 		$scope.loaded = false;
//
// 		var $this = $('.navbar.custom');
// 		// if (!$rootScope.isMobile) {
// 		// 	$this.on('mouseover', function(e){
// 		// 		var $th = $(e.currentTarget);
// 		// 		if ($th.hasClass('minimal')) {
// 		// 			$th.removeClass('minimal');
// 		// 		}
// 		// 	}).on('mouseout', function(e){
// 		// 		var $th = $(e.currentTarget);
// 		// 		if (!$th.hasClass('minimal')) {
// 		// 			$th.addClass('minimal');
// 		// 		}
// 		// 	});
// 		// } else {
// 		// 	$this = $('.navbar.custom');
// 		// 	$ghost = $('.mobile-menu');
// 		// 	$ghost.bind('click', function(e){
// 		// 		if ($this.hasClass('active')) {
// 		// 			$this.removeClass('active');
// 		// 		} else {
// 		// 			$this.addClass('active');
// 		// 		}
// 		// 	});
// 		// }
// 		menuService.init(function(d){
//
// 			$scope.menu = d;
// 			$scope.loaded = true;
// 		});
// 	})
// 	.controller('Info', function($scope, $http, $location, $window, apiService) {
// 		apiService.init('pages', function(i){
// 			var info = _.find(i, function(ii){
// 				return ii.slug === 'info';
// 			});
// 			$scope.info = info.acf;
// 		});
// 	})
// 	.controller('Meta', function($scope, $http, $location, $window, apiService) {
//
// 	})
// 	.controller('Gallery',
// 		function($scope, $http, $stateParams, $window, $document, IGService) {
// 			var i = 1;
// 			var pag = [];
// 			var url;
// 			$scope.igfeed = false;
// 			$scope.loaded = false;
// 			$scope.toggled = false;
// 			$scope.pics = [];
// 			$scope.igpics = [];
//
// 			igInit();
//
// 			function igInit() {
// 				IGService.fetchPopular(function(data){
// 						$scope.igpics = data.data;
// 						pag = data.data;
// 				});
//
// 				$scope.$on('IG', function(event,data) {
// 					$scope.loaded = true;
// 					var x = document.getElementsByClassName("touchscroll");
// 					$document.bind('scroll', _.throttle(chk_scroll, 300));
// 				});
//
// 				$scope.$on('IGnext', function(event,data) {
//
//
// 					_.each(data.data.data,  function(a){
// 						pag.push(a);
// 					});
//
// 					if (!$scope.$$phase) {
// 						$scope.loaded = true;
// 						angular.extend($scope.igpics, pag);
// 						$scope.$apply();
// 					} else if ($scope.igpics.length > 400) {
// 						$document.unbind('scroll');
// 					} else {
// 						angular.extend($scope.igpics, pag);
// 					}
// 				});
//
// 				$scope.$on('$destroy', function() {
// 					$document.unbind('scroll');
// 				});
//
// 				function chk_scroll(e) {
//
//
//
//
// 					var elem = $('.touchscroll');
// 					if ((2*$window.scrollY)+60 > $('.touchscroll').height()) {
// 						$scope.loaded = false;
// 						if (!IGService.pag) {
// 							url = IGService.response.data.pagination.next_max_id;
// 						} else {
//
// 							url = IGService.pag.data.pagination.next_max_id;
// 						}
// 						IGService.next(url, i);
// 						i++;
// 					}
// 				}
// 			}
// 	});
