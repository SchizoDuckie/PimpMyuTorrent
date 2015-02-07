/**
 * Handle global dependencies
 */

angular.module('DuckieTorrent', [
	'ngRoute',
    'DuckieTorrent.controllers',
    'DuckieTorrent.torrent'
 ])

/**
 * Routing configuration. 
 */
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html', 
      controller: 'MainCtrl'
    })
    .otherwise({redirectTo: '/'});
}).run(function($rootScope) {
    
   
})

String.capitalize = function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
};


Object.deepMerge = function(obj1, obj2){ 
    for (i in obj2) { // add the remaining properties from object 2
        if(typeof obj2[i] !== 'object' && typeof obj2[i] !== 'array') {
          obj1[i] = obj2[i];
        } else {
          obj1[i] = Object.deepMerge(obj1[i], obj2[i]);
        }
    }
    return obj1;
}