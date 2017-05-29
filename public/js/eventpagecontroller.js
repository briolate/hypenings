var app = angular.module("ourApp");

app.controller('eventPageController', function($scope,eventService,$location) {
	var eventId = $location.url().slice(-1);

	eventService.getEventById(eventId).then(function(response) {
		$scope.viewEvent = response[0];
	});


 });