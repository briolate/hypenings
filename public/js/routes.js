var app=angular.module('ourApp', ['ngRoute'])
app.config(function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'views/view1.html',
      controller: 'myController'

    })
    .when('/view2', {
      templateUrl: 'views/view2.html',
      controller: 'myController'

    }).when('/view3', {
      templateUrl: 'views/view3.html'

    }).when('/register', {
      templateUrl: 'views/register.html',

    }).when('/submitted', {
      templateUrl: 'views/submit.html',


    }).when('/view4', {
      templateUrl: 'views/view4.html',
      controller: 'myController'
    })


    .when('/search', {
      templateUrl: 'views/search.html',
      controller: 'searchController'
    })

    .otherwise('/view1');
    
  });
