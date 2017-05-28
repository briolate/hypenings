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

<<<<<<< HEAD
    }).when('/register', {
      templateUrl: 'views/register.html',

=======
    }).when('/submitted', {
      templateUrl: 'views/submit.html',


    }).when('/view4', {
      templateUrl: 'views/view4.html',
      controller: 'myController'
>>>>>>> d2a0444fa8b006f8bfe09db65f60ebd1dae8f245
    })
    
    .otherwise('/view1');
  });
