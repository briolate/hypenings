var app = angular.module("ourApp");

app.controller("searchController", function ($scope, eventService, $location ) { 
	$scope.searchEvents = [];

	eventService.getAllEvents().then(function(response) {
		$scope.searchEvents = response;
	});

	$scope.goToEvent = function (eventId) {
		$location.url('/event?id=' + eventId);
	};

}) 