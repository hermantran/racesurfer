define([
  "jquery",
  "templates"
], function() {
  "use strict";
  var App = {
    initialize: function() {
      var options = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 11
      };
      
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          options.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          new google.maps.Map(document.getElementById("gmap"), options);
        });
      }
    }
  };
  
  return App;
});