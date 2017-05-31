var app = angular.module("ourApp");

app.controller('submitController', function($scope,varShare) {

  $scope.postId = varShare.getId();
  console.log($scope.postId);
})
