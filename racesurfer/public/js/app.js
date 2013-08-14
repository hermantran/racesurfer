define([
  "jquery",
  "templates",
  "collections/items",
  "views/list"
], function($, Templates, ItemsCollection, ListView) {
  "use strict";
  var App = {
    initialize: function() {
      /* Caching DOM elements */
      var el = {
        $sidebar: $('.sidebar')  
      };
      
      var options = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 11
      };
      
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          var activeItemsCollection = new ItemsCollection({ url: paths.active }),
              listView = new ListView({ collection: activeItemsCollection });
          activeItemsCollection.fetch({
            data: { 
              term: "10K",
              lat: pos.lat,
              lng: pos.lng
            },
            success: function() {
              el.$sidebar[0].appendChild(listView.el);
              console.log(activeItemsCollection);
            }
          });
          
          options.center = new google.maps.LatLng(pos.lat, pos.lng);
          // new google.maps.Map(document.getElementById("gmap"), options);
         
        });
      }
    }
  };
  
  return App;
});