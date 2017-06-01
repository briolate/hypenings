var app=angular.module('ourApp', ['ngRoute'])
app.config(function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/view1.html',
      controller: 'myController'

    })
    .when('/viewmap', {
      templateUrl: 'views/view2.html',
      controller: 'myController'

    }).when('/addevent', {
      templateUrl: 'views/view3.html'

    }).when('/register', {
      templateUrl: 'views/register.html',

    }).when('/submitted', {
      templateUrl: 'views/submit.html',
      controller: 'myController'

    }).when('/manage', {
      templateUrl: 'views/view4.html',
      controller: 'myController'
    }).when('/deleted',{
      templateUrl: 'views/deleted.html',
      controller: 'myController'
    }).when('/search', {
      templateUrl: 'views/search.html',
      controller: 'searchController'
    })

    .when('/event', {
      templateUrl: 'views/event.html',
      controller: 'eventPageController'
    })

    .otherwise('/home');

  });
