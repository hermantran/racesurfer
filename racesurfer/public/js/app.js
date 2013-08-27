define([
  "jquery",
  "state",
  "collections/items",
  "views/list",
], function($, AppState, ItemsCollection, ListView) {
  "use strict";
  var App = {
    initialize: function() {
      // Caching DOM elements
      var el = {
        $sidebar: $(".sidebar"),
        $input: $(".input-append > input[type='text']"),
        $search: $(".input-append > span.search"),
        $map: $(".map-container")
      };
         
      var activeItemsCollection = window.c = new ItemsCollection({ url: paths.active }),
          listView = new ListView({ collection: activeItemsCollection }),
          mapView;
      
      el.$sidebar[0].appendChild(listView.el);
      
      if ("geolocation" in navigator) {
        // Set the geolocation based coordinates
        navigator.geolocation.getCurrentPosition(function(position) {
          AppState.set("pos", {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });

        el.$input.on("keyup", function(e) {
          if (e.keyCode === 13) el.$search.click();
        });
        
        el.$search.on("click", function() {
          // Determine if Google Maps has already been async loaded into the page
          if (!AppState.get("gmap")) {
            require(["views/gmap"], function(GmapView) {
              mapView = new GmapView({ collection: activeItemsCollection });
              el.$map[0].appendChild(mapView.render().el);
              AppState.set("gmap", true);
            });    
          }
          
          activeItemsCollection.fetch({
            data: { 
              term: el.$input.val(),
              lat: AppState.get("pos").lat,
              lng: AppState.get("pos").lng
            }
          });
        });
        
      } else {
        el.$input
          .val("Geolocation is not supported in your browser.")
          .addClass("input-xxlarge")
          .prop("disabled", "disabled")
          .next().hide();  
      }
    }
  };
  
  return App;
});