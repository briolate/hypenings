 var app = angular.module('ourApp');

app.controller('mapController', function($scope, eventService) {
$scope.formItem = {};
$scope.events;
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
            var marker = new google.maps.Marker({
             position:{lat:position.coords.latitude, lng:position.coords.longitude},
            map:map
            });

            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            // console.log(pos);
            map.setZoom(15);
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
function getEvents () {
  eventService.getAllEvents().then(function(eventArr) {
    $scope.events = eventArr;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log(pos);
        console.log(eventArr);
        for(i=0; i < eventArr.length; i++){
        //   var contentString='eventArr.eventname';
        //   var infowindow = new google.maps.InfoWindow({
        //   content: contentString
        // });
          // var marker=[];
          marker = new google.maps.Marker({
           position:{lat:Number(eventArr[i].lat), lng:Number(eventArr[i].lng)},
          map:map,
          title: eventArr[i].eventname,
          date: eventArr[i].date,
          hood: eventArr[i].hood
        });
        // var eventMark = marker[i];
        marker.addListener('click', function() {

          infoWindow.open(map, marker);
          infoWindow.setContent("<div class='markerInfo'>"+marker.title+"<br>"+marker.date+"<br>"+ marker.hood+"</div>");
        });

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
getEvents();
// function getLoc() {
//
//
//
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function(position) {
//           var pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//
//           console.log(pos);
//           var contentString='<img src="https://upload.wikimedia.org/wikipedia/en/8/88/Opera_singer.jpg">'
//           var infowindow = new google.maps.InfoWindow({
//           content: contentString
//         });
//           var marker = new google.maps.Marker({
//            position:{lat:42.3365, lng:-83.0488},
//           map:map,
//           title: 'Operaaaaaa!'
//         });
//         marker.addListener('click', function() {
//           infowindow.open(map, marker);
//           // infoWindow.setContent(marker.title);
//         });
//
//         }, function() {
//           handleLocationError(true, infoWindow, map.getCenter());
//         });
//       } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//       }
//     }
//
//     function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//       infoWindow.setPosition(pos);
//       infoWindow.setContent(browserHasGeolocation ?
//                             'Error: The Geolocation service failed.' :
//                             'Error: Your browser doesn\'t support geolocation.');
//       infoWindow.open(map);
//     }
// getLoc();
})
