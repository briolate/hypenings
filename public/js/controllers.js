var app = angular.module("ourApp");

app.controller("myController", function ($scope, eventService) {
	$scope.lat=0;
	$scope.long=0;
	$scope.formItem = {};
	$scope.searchForm = {};
	$scope.flyers = [];
 getLocation();
	$scope.addEvent = function(item) {

		item.lat = $scope.lat;
		item.long = $scope.long;

		eventService.addEvent(item).then(function() {
			console.log($scope.formItem);
			getEvents();

			$scope.searchHood();
			console.log(item);
		});
	}

	function getEvents () {
		eventService.getAllEvents($scope.lat, $scope.long).then(function(eventArr) {
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
	getLocation();
	function getLocation () {
		eventService.getAllEvents().then(function(eventArr) {

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

					console.log(pos);
					$scope.lat = pos.lat;
					$scope.long = pos.lng;
					eventService.getLocalEvents($scope.long,$scope.lat);

				}, function() {
					handleLocationError(true, infoWindow, map.getCenter());
				});
			} else {
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, map.getCenter());
			}

		});
	}

});
