var app=angular.module('ourApp', ['ngRoute'])
app.config(function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'views/view1.html',

    })
    .when('/view2', {
      templateUrl: 'views/view2.html',


    }).when('/view3', {
      templateUrl: 'views/view3.html',

    })
    .otherwise('/view1');
  });
