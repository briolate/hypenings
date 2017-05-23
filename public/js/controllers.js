var app = angular.module("ourApp");

app.controller("myController", function ($scope, eventService) {
	$scope.formItem = {};
	$scope.searchForm = {};

	$scope.addEvent = function(item) {
		eventService.addEvent(item).then(function() {
			console.log($scope.formItem);
			getEvents();
			$scope.searchHood();
		});
	}

	function getEvents () {
		eventService.getAllEvents().then(function(eventArr) {
			$scope.events = eventArr;
		});
	}
	getEvents();


	$scope.searchHood = function() {
		getEvents();
		$scope.hoodResults = [];
		var targetHood = $scope.searchForm.hood;
		for (var i = 0; i < $scope.events.length; i++) {
			if ($scope.events[i].hood == targetHood) {
				$scope.hoodResults.push($scope.events[i]);
			}
		}
	}
});
