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
//gets events within 1 mile radius and takes user lat and long
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

    // get event with postid
    this.manageEvent = function(userPostid){
      var promise = $http({
        method: 'GET',
        url:'/managepost?postid=' + userPostid
      }).then(function successCallback(response){
        eventArr=response.data;
        console.log(response.data);
        return eventArr;
      }, function errorCallback(response){
        console.log('error');
      });
      return promise;
    };

    this.getEventById = function(id){
      var eventArr = [];
      var promise = $http({
        method: 'GET',
        url:'/viewpost?id=' + id
      }).then(function successCallback(response){
        eventArr=response.data;
        return eventArr;
      }, function errorCallback(response){
        console.log('error');
      });
      return promise;
    };

    this.deleteEvent = function(userPostid) {
        // DELETE /api/items/{ID}
        return $http.delete('/deletepost?postid='+ userPostid).then(function(response){
          return response;
          console.log(response);
        // TODO Make the HTTP request to the server and return a promise.
    })
    }

});
//controller was reset so this takes care of that. gets and returns. puts postid onto submit page
app.service("varShare", function() {
  var idShare;
  this.setId = function(id) {
    idShare = id;
  }
  this.getId = function() {
    return idShare;
  }
});
