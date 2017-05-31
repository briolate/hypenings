var app = angular.module("ourApp");

app.controller('submitController', function($scope, varShare) {

  $scope.postId = varShare.getId();
  console.log($scope.postId);
  console.log('hi');
})
