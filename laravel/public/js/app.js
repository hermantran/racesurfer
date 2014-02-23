define([
  "jquery",
  "state",
  "router",
  "templates",
  "models/itemContainer",
  "views/list",
  "views/itemSummary"
], function($, AppState, Router, Templates, ItemContainer, ListView, ItemSummaryView) {
  "use strict";
  // Caching DOM elements
  var el = {
    $sidebar: $(".sidebar"),
    $input: $(".input-append > input[type='text']"),
    $search: $(".input-append > span.search"),
    $map: $(".map-container")
  };
  
  var activeItemsContainer,
      activeItemsCollection,
      listView,
      itemSummaryView,
      mapView;
  
  function initialize() {
    activeItemsContainer = new ItemContainer({ url: paths.active });
    activeItemsCollection = activeItemsContainer.get("results");
    listView = new ListView({ collection: activeItemsCollection });
    itemSummaryView = new ItemSummaryView({ collection: activeItemsCollection });
    
    el.$sidebar
      .append(itemSummaryView.el)
      .append(listView.el);

    if ("geolocation" in navigator) {
      initializeGmap();
    } else {
      displayGeolocationError();
    }
  }
  
  function initializeGmap() {
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
          Backbone.history.start();  
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
    
    el.$search.on("click", function(e) {
      var data = {
        term: el.$input.val(),
        lat: AppState.get("pos").lat,
        lng: AppState.get("pos").lng,
        page: 1
      };
      
      Router.navigate("/results/" + data.lat + ";" + data.lng + "/" + data.term + "/1", { trigger: true });  
    });
    
    Router.on("route:results", function(lat, lng, term, page) {
      var data = {
        lat: lat,
        lng: lng,
        term: term,
        page: page
      };
      App.searchActive(data);
    });
  }
  
  function displayGeolocationError() {
    el.$input
      .val("Geolocation is not supported in your browser.")
      .addClass("input-xxlarge")
      .prop("disabled", "disabled")
      .next().hide();    
  }
  
  function searchActive(data) {
    itemSummaryView.$el.html(Templates.loader());
        
    activeItemsContainer.fetch({
      data: data,
      success: function() {
        mapView.setCenter(data.lat, data.lng);
        itemSummaryView.$el.html(Templates.itemSummary({ count: activeItemsContainer.get("count") }));  
      }
    });  
  }
  
  var App = {
    initialize: initialize,
    searchActive: searchActive
  };
  
  return App;
});