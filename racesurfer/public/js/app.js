define([
  "jquery",
  "state",
  "templates",
  "collections/items",
  "collections/photos",
  "views/list",
  "views/itemSummary"
], function($, AppState, Templates, ItemsCollection, PhotoCollection, ListView, ItemSummaryView) {
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
         
      var activeItemsCollection = new ItemsCollection({ url: paths.active }),
          photoCollection = new PhotoCollection({ url: paths.flickr }),
          listView = new ListView({ collection: activeItemsCollection }),
          itemSummaryView = new ItemSummaryView({ collection: activeItemsCollection }),
          mapView;
      
      el.$sidebar
        .append(itemSummaryView.el)
        .append(listView.el);

      if ("geolocation" in navigator) {
        // Set the geolocation based coordinates
        navigator.geolocation.getCurrentPosition(function(position) {
          AppState.set("pos", {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }); 
          
          itemSummaryView.el.innerHTML = "Google Maps initialzing...";
          
          // Determine if Google Maps has already been async loaded into the page
          if (!AppState.get("gmap")) {
            require(["views/gmap"], function(GmapView) {
              mapView = new GmapView({ collection: activeItemsCollection });
              el.$map[0].appendChild(mapView.render().el);
              AppState.set("gmap", true);
              itemSummaryView.el.innerHTML = "Enter a search term above to populate results.";
            });    
          }
        });
        
        // Event handler done here so that we reference the instance of GmapView created here
        listView.$el.on("click", "a", function() {
          var cid = $(this).closest("li").attr("data-cid");
          
          mapView.infowindows[cid].open(mapView.map, mapView.markers[cid]);
          mapView.map.setCenter(mapView.markers[cid].getPosition());
        });

        el.$input.on("keyup", function(e) {
          if (e.keyCode === 13) el.$search.click();
        });
        
        el.$search.on("click", function() {
          itemSummaryView.$el.html(Templates.loader());
          
          activeItemsCollection.fetch({
            data: { 
              term: el.$input.val(),
              lat: AppState.get("pos").lat,
              lng: AppState.get("pos").lng
            },
            success: function() {
              itemSummaryView.$el.html(Templates.itemSummary({ count: activeItemsCollection.models.length }));  
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