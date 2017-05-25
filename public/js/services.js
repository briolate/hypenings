 var app = angular.module("ourApp");
 app.service("eventService", function($http) {

    this.addEvent = function(item) {
        var promise = $http({
            url: '/events',
            method: "POST",
            data: item
        })
        .then(function(response) {
            console.log('success')
        },
        function(response) {
            console.log('post failed');
        });
        return promise;
    };

    this.getAllEvents = function() {
        var eventArr = [];
        var promise = $http({
          method: 'GET',
          url: '/events'
      }).then(function successCallback(response) {
        eventArr = response.data;
        console.log(eventArr);
        return eventArr;
    }, function errorCallback(response) {
        console.log('error');
    });
      return promise;
    };

    this.getLocalEvents = function(lat,lng) {
        var eventArr = [];
        var promise = $http({
          method: 'GET',
          url: '/localevents?lat=' + lat + '&lng=' + lng
      }).then(function successCallback(response) {
        eventArr = response.data;
        console.log(eventArr)
        return eventArr;

        // return eventArr;
    }, function errorCallback(response) {
        console.log('error');
    });
      return promise;
    };



});
