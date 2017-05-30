var app = angular.module("ourApp");

app.controller('homeController', function($scope,eventService,$location) {

	eventService.getAllEvents().then(function(response) {
		response.reverse();
		$scope.recentEvents = response;
	});

		$scope.goToEvent = function (eventId) {
		$location.url('/event?id=' + eventId);
	}

});
