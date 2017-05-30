var app = angular.module("ourApp");

app.controller('eventPageController', function($scope,eventService,$location) {
	var eventId = $location.url().slice(-1);

	eventService.getEventById(eventId).then(function(response) {
		$scope.viewEvent = response[0];
	});




// Map shows only the event selected


// defining variables
	var markerArray = [];
  $scope.formItem = {};
  $scope.events;
  $scope.times=[];
  var map, infoWindow;
//initMap() shows our google map and also gets user current location
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.3314, lng: -83.0458},
      zoom: 11,
      scrollwheel: false
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation. Gets current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
// adds marker for current location
        var marker = new google.maps.Marker({
          position:{lat:position.coords.latitude, lng:position.coords.longitude},
          icon: '../img/blueCir.png',
          map:map
        });

        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        // infoWindow.open(map);
        // console.log(pos);
        map.setZoom(14);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

    initMap();
// getEvents() pulls in events in users area (in this car the one that is selected)
    $scope.getEvents = function() {
      eventService.getEventById(eventId).then(function(response) {
        //this for loop runs a calc to figure out when posts expire and pushes data into the response from the database
        for (var i = 0;i < response.length; i++) {
          var timestamp = response[i].timeadded;
          var unix_seconds = ((new Date(timestamp)).getTime());
          var date=Date.now();
          var s=new Date(unix_seconds+172800000);

          console.log(s.toLocaleString());

          response[i].expTime = (s.toLocaleString());
        }

        var eventArr = response;
        $scope.events=response;
        console.log($scope.lat);
        console.log(eventArr);
        console.log($scope.events);

//get's current location to draw a visual radius around the user's marker on the map
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            console.log(pos);
            // console.log(eventArr);

            var cityCircle = new google.maps.Circle({
            strokeColor: '#7cdaf9',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#7cdaf9',
            fillOpacity: 0.35,
            map: map,
            center: pos,
            radius: 1609.34
          });
//this for loop generates markers for each event and adds desired information into the info window
            for(i=0; i < eventArr.length; i++){
              //   var contentString='eventArr.eventname';
              //   var infowindow = new google.maps.InfoWindow({
              //   content: contentString
              // });


              var marker = new google.maps.Marker({
                position: { lat:Number(eventArr[i].lat), lng:Number(eventArr[i].lng) },
                map:map,
                title: eventArr[i].eventname,
                date: eventArr[i].date,
                hood: eventArr[i].hood,
                pic: eventArr[i].pic
              });


// this function shows or hides infowindow based on mouseover or mouseout
              (function(marker, i) {
                google.maps.event.addListener(marker, 'mouseover', function() {
                  infowindow = new google.maps.InfoWindow({
                    content: "<div class='markerInfo'>"+marker.title+"<br>"+marker.date+"<br><img class='markerIcons' src='"+ "img/"+marker.pic+".png'></div>"
                  });
                  infowindow.open(map, marker);
                });
              })(marker, i);
              (function(marker, i) {
                google.maps.event.addListener(marker, 'mouseout', function() {
                  infowindow.close(map, marker);
                });
              })(marker, i);

            }


          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

      });


    }

$scope.getEvents();
 });
