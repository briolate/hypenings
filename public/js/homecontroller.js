var app = angular.module("ourApp");

app.controller('homeController', function($scope,eventService) {

	eventService.getAllEvents().then(function(response) {
		response.reverse();
		$scope.homeEvents1 = response[0];
		$scope.homeEvents2 = response[1];
		$scope.homeEvents3 = response[2];
	});


});