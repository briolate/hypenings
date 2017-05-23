var app = angular.module('myApp', ['ngMap']);

// $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE";

app.controller('mapController', function(NgMap) {
  NgMap.getMap().then(function(map) {
    // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCOnaTmhxrYprXqy9eTUbe8ioAD1vjG6zI";

    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
});
