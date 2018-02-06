//PRODUCT
function productService($http) {
  'use strict';
  var data = {},
      api = {},
      endpoint;

      api.init = function(slug, callback){
        endpoint = location.origin+'/wp-json/wp/v2/product/'+slug;
        $http({
          method: 'GET',
          url: endpoint
        }).then(function(response) {
            data = response.data;
            // api.sendData(data);
            callback(data);
        }, function errorCallback(response) {
          console.log(response, 'err');
        });
      };

      api.timestamp = function(length) {
        var timeStampInMs = Date.now();
        return timeStampInMs.toString().substring(0, 10);
      };

      api.nonce = function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      };

      api.woo = function(slug, callback){
        var url = location.origin+'/wp-json/wc/v2/products/'+slug;
        var foo = {
          "cs": "cs_c513976829eba909e24a2e5a5b141cd0b40e8560",
        };
        var params = {
          oauth_consumer_key : 'ck_60e00b2f50e1a8be931ee4ea8df57a63087838e0',
          oauth_signature_method : 'HMAC-SHA1',
          oauth_timestamp : api.timestamp(),
          oauth_nonce : api.nonce(6),
          oauth_signature : ''
        };
        var mess = 'oauth_consumer_key='+params.oauth_consumer_key+'&'+'oauth_signature_method=HMAC-SHA1'+'&';
        // console.log(CryptoJS);
        var hash = CryptoJS.HmacSHA256(mess, foo.cs);
        // console.log(hash, 'hash');
        var base64 = hash.toString(CryptoJS.enc.Base64);
        // console.log(base64, 'base64');
        params.oauth_signature = base64;

        var auth = 'oauth_consumer_key="'+params.oauth_consumer_key+'",oauth_signature_method="HMAC-SHA256",oauth_timestamp="'+api.timestamp()+'",oauth_nonce="'+api.nonce(6)+'",oauth_signature="'+base64+'"';
        $http({
          url : url,
          method : 'GET',
          headers: {'Authorization': auth}
        }).then(function(data){
          alert("login Successfully");
          callback(data);
        },function errorCallback(error) {
          // alert("login error");
          console.log(error, 'err');
          callback(error);
        });

      };


      return api;
}
//POSTS
function apiService($http) {
  'use strict';

    var data = {},
        api = {},
        endpoint;

    api.init = function(slug, callback){
        endpoint = location.origin+'/wp-json/wp/v2/'+slug;
        $http({
          method: 'GET',
          url: endpoint
        }).then(function(response) {
            data = response.data;
            api.sendData(data);
            callback(data);
        }, function errorCallback(response) {
          console.log(response, 'err');
        });
    };

    api.getData = function(){
        return data;
    };

    api.sendData = function(data){
      var d = data;
      api.data = d;
      return api.data;
    };

    return api;
}

//MENU_API
function menuService($http) {
    'use strict';

    var data = {},
        api = {},
        endpoint,
        i = 0;

    api.init = function(callback){
        api.http('/wp-json/wp-api-menus/v2/menu-locations/footer', function(d){
          callback(d);
        });
    };

    api.http = function(endPoint, callback) {
      var url = location.origin+endPoint;
      $http({
        method: 'GET',
        url: endPoint
      }).then(function(response) {
          data = response.data;
          // api.sendData(data);
          callback(data);
      }, function errorCallback(response) {
        console.log(response, 'err');
      });
    };

    api.getData = function(){
        return data;
    };

    api.sendData = function(data){
      var d = data;
      api.data = d;
      return api.data;
    };

    return api;
}
function IGService($http, $rootScope, $sce) {
      'use strict';
      var data = {};
      var api = {};
      var act = '1582437323.1677ed0.115cf6dabb8d4261aee7fc66eb0fb3ff';
      // var i = 0;

      api.fetchPopular = function(callback){
        var endPoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token='+act+'';

        $http.jsonp($sce.trustAsResourceUrl(endPoint)).then(function(response){
          api.response = response;
          $rootScope.$broadcast('IG', response.data);
          callback(response.data);
        });
      };

      api.next = function(url, i){
        var endPoint = 'https://api.instagram.com/v1/users/1582437323/media/recent?access_token='+act+'&max_id='+url;
        $http.jsonp($sce.trustAsResourceUrl(endPoint)).then(function(response){
          // console.log(response, '---Response'+i+'');
          api.pag = response;
          $rootScope.$broadcast('IGnext', response);
        });
      };

      return api;
}


//Finally register the service
angular.module('marokk').factory('productService', ['$http', productService]);
angular.module('marokk').factory('apiService', ['$http', apiService]);
angular.module('marokk').factory('menuService', ['$http', menuService]);
angular.module('marokk').factory('IGService', ['$http', '$rootScope', '$sce', IGService]);
