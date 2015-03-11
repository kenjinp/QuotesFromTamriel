'use strict';

var QFT = angular.module('QFT', ['ngRoute']);

QFT.config(['$routeProvider', '$locationProvider',
 function(
   $routeProvider,
  $locationProvider) {

    $routeProvider.when(
    	'/',
    	{
    		templateUrl: 'app/views/partials/home.html',
    		controller: 'HomeCtrl',
    	}
    );
    $routeProvider.when(
      '/new',
      {
        templateUrl: 'app/views/partials/new.html',
        controller: 'NewCtrl',
      }
    );
    $routeProvider.when(
      '/quotes',
      {
        templateUrl: 'app/views/partials/quotes.html',
        controller: 'QuotesCtrl',
      }
    );
    $routeProvider.otherwise(
        {
            redirectTo: '/'
        });

    //$locationProvider.html5Mode(true);
}]);
