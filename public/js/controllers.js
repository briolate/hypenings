var app = angular.module("ourApp");

app.controller("myController", function ($scope, eventService) {
	$scope.lat=0;
	$scope.long=0;
	$scope.formItem = {};
	$scope.searchForm = {};
	$scope.flyers = [];
	$scope.submissionSuccess = false;
	$scope.eventFound = true;
	$scope.deleted=false;
	$scope.timeLeft=0;
	$scope.times=[];
	$scope.postIDShow;
	$scope.userPostid="";
	$scope.postToManage=[];
 // getLocation();
	$scope.addEvent = function(item) {
		item.lat = $scope.lat;
		item.long = $scope.long;
		//postid generator
		function random(){
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 12;
    var genPostID = '';
		for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            genPostID += chars.substring(rnum,rnum+1);
        }
				return genPostID;
		}
		$scope.postIDShow=random();
		item.postid=$scope.postIDShow;
		console.log(item);
		eventService.addEvent(item).then(function() {
			console.log($scope.formItem);
			window.location.href = "mailto:.com?subject=Hypenings%20Event%20Information&body=Your%20post%20ID%20is%20 "+$scope.postIDShow+" .%20Don't%20loose%20it!%20Be%20sure%20to%20email%20this%20to%20yourself%20.";
			// console.log(item);
			$scope.submissionSuccess = true;
		});
		$scope.formItem = {};
	}
$scope.manageEvent = function(userPostid){
	console.log(userPostid);
	eventService.manageEvent(userPostid).then(function(response) {
		if (response.length === 0){
			console.log('nothing here');
			$scope.eventFound = false;
		}else{
		$scope.postToManage = response;
		console.log($scope.postToManage);
		// console.log(item);
		$scope.submissionSuccess = true;
	}
	});
	$scope.formItem = {};

}

$scope.deleteEvent = function(userPostid){
	console.log(userPostid);
	eventService.deleteEvent(userPostid).then(function(response){
		console.log('DELETED')
		$scope.deleted=true;
	})
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
