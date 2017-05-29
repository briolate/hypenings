var app = angular.module("ourApp");

app.controller('homeController', function($scope,eventService) {

	eventService.getAllEvents().then(function(response) {
		response.reverse();
		$scope.recentEvents = response;
	});


});
