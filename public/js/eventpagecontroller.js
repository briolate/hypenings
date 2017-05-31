var app = angular.module("ourApp");

app.controller('eventPageController', function($scope,eventService,$location) {
	var eventId = $location.url();
	eventId = eventId.substring(eventId.indexOf('=') + 1, eventId.length);
	 console.log(eventId);

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
  	  var styledMapType = new google.maps.StyledMapType( 
      [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
      );

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: Number($scope.viewEvent.lat), lng: Number($scope.viewEvent.lng)},
      zoom: 30,
      scrollwheel: false,
      mapTypeControlOptions: {
            mapTypeIds: ['styled_map']
          }
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
        map.setZoom(17);

      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
     map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

// getEvents() pulls in events in users area (in this car the one that is selected)
    $scope.getEvents = function() {
      eventService.getEventById(eventId).then(function(response) {
        //this for loop runs a calc to figure out when posts expire and pushes data into the response from the database

          var timestamp = response[0].timeadded;
          var unix_seconds = ((new Date(timestamp)).getTime());
          var date=Date.now();
          var s=new Date(unix_seconds+172800000);

          console.log(s.toLocaleString());

          response[0].expTime = (s.toLocaleString());


    initMap();
        var eventArr = response;
        $scope.events=response;

//get's current location to draw a visual radius around the user's marker on the map
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            console.log(pos);
            // console.log(eventArr);

          //   var cityCircle = new google.maps.Circle({
          //   strokeColor: '#7cdaf9',
          //   strokeOpacity: 0.8,
          //   strokeWeight: 2,
          //   fillColor: '#7cdaf9',
          //   fillOpacity: 0.35,
          //   map: map,
          //   center: pos,
          //   radius: 1609.34
          // });
//this for loop generates markers for each event and adds desired information into the info window
            for(i=0; i < eventArr.length; i++){
              //   var contentString='eventArr.eventname';
              //   var infowindow = new google.maps.InfoWindow({
              //   content: contentString
              // });
							function convertDate (date) {
								var output = "";
								output = date.substring(5,7) + "-" + date.substring(8,10);
								return output;
							}

              var marker = new google.maps.Marker({
                position: { lat:Number(eventArr[i].lat), lng:Number(eventArr[i].lng) },
                map:map,
								title: eventArr[i].eventname,
                date: eventArr[i].date,
                dateEnd: eventArr[i].expTime,
                hood: eventArr[i].hood,
                pic: eventArr[i].pic
              });


// this function shows or hides infowindow based on mouseover or mouseout
              (function(marker, i) {
                google.maps.event.addListener(marker, 'mouseover', function() {
                  infowindow = new google.maps.InfoWindow({
                    content: "<div class='markerInfo'>"+marker.title+ "<br> <b>starts</b><br> " + convertDate(marker.date)+ "<br><b>expires at</b><br> " + marker.dateEnd +"<br><img class='markerIcons' src='"+ "img/"+marker.pic+".png'></div>"
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
