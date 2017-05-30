var app = angular.module("ourApp");

app.directive('flyer', function() {
  return {
  	scope: {flyer: '='},
  	restrict: 'E',
    templateUrl: '../views/flyer.html',
    replace: false
  };
});