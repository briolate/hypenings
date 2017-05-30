var app = angular.module("ourApp");

app.controller("searchController", function ($scope, eventService) { 
	$scope.searchEvents = [];

	eventService.getAllEvents().then(function(response) {
		$scope.searchEvents = response;
	});

}) 