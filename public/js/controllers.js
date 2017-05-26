var app = angular.module("ourApp");

app.controller("myController", function ($scope, eventService) {
	$scope.lat=0;
	$scope.long=0;
	$scope.formItem = {};
	$scope.searchForm = {};
	$scope.flyers = [];
	$scope.submissionSuccess = false;
	$scope.timeLeft=0;
	$scope.times=[];
 // getLocation();
	$scope.addEvent = function(item) {
		item.lat = $scope.lat;
		item.long = $scope.long;
		eventService.addEvent(item).then(function() {
			console.log($scope.formItem);

			console.log(item);
			$scope.submissionSuccess = true;
		});
		$scope.formItem = {};
	}

	

	// function getEvents () {
	// 	eventService.getLocalEvents().then(function(eventArr) {
	// 		$scope.events = eventArr;
	//
	// 	});
	// }
	// getEvents();


	$scope.searchHood = function() {
		// localEvents();
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


			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					$scope.lat = pos.lat;
					$scope.long = pos.lng;
					eventService.getLocalEvents($scope.lat,$scope.long);

				}, function() {
					handleLocationError(true, infoWindow, map.getCenter());
				});
			} else {
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, map.getCenter());
			}


	}

});
