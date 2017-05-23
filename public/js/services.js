 var app = angular.module("myApp");
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
        return eventArr;
    }, function errorCallback(response) {
        console.log('error');
    });
      return promise;
    };

});