var app=angular.module('ourApp', ['ngRoute'])
app.config(function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'views/view1.html',
      
    })
    .when('/view2', {
      templateUrl: 'views/view2.html',
      controller: myController

    }).when('/view3', {
      templateUrl: 'views/view3.html',
      controller: myController

    })
    .otherwise('/view1');
  });
