var app = angular.module("ourApp");

app.controller('homeController', function($scope,eventService,$location) {
//gets most recent events and puts on homepage. gets list of events reverses them, post three
	eventService.getAllEvents().then(function(response) {
		response.reverse();
		$scope.recentEvents = response;
	});

		$scope.goToEvent = function (eventId) {
		$location.url('/event?id=' + eventId);
	}

});
