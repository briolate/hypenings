var app = angular.module("ourApp");

app.directive('flyer', function() {
  return {
  	restrict: 'E',
    templateUrl: '../views/flyer.html',
    replace: false
  };
});