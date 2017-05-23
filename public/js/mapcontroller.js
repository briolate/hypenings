 var app = angular.module('ourApp');
//
// // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE";
//
app.controller('mapController', function() {
//
//   NgMap.getMap().then(function(map) {
//     // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCOnaTmhxrYprXqy9eTUbe8ioAD1vjG6zI";
//
//     console.log(map.getCenter());
//     console.log('markers', map.markers);
//     console.log('shapes', map.shapes);
//   });
// });
var map, infoWindow;
  function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.3314, lng: -83.0458},
          zoom: 14
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var maker = new google.maps.Marker({
             position:{lat:position.coords.latitude, lng:position.coords.longitude},
            map:map
            });

            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            // console.log(pos);
            map.setZoom(16);
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
function getLoc() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log(pos);

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
getLoc();
})
