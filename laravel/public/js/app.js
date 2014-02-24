define([
  "jquery",
  "state",
  "router",
  "models/itemContainer",
  "views/list",
  "views/itemSummary"
], function($, AppState, Router, ItemContainer, ListView, ItemSummaryView) {
  "use strict";
  // Caching DOM elements
  var el = {
    $sidebar: $(".sidebar"),
    $form: $('.input-form'),
    $input: $(".input-form > input[type='text']"),
    $map: $(".map-container")
  };
  
  var activeItemsContainer,
      activeItemsCollection,
      listView,
      itemSummaryView,
      mapView;
  
  function initializeGmap() {
    // Set the geolocation based coordinates
    navigator.geolocation.getCurrentPosition(function(position) {
      AppState.set("pos", {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }); 
      
      AppState.set("hasGeolocation", true);
      
      // Determine if Google Maps has already been async loaded into the page
      if (!AppState.get("hasGmap")) {
        require(["views/gmap"], function(GmapView) {
          mapView = new GmapView({ collection: activeItemsCollection });
          el.$map[0].appendChild(mapView.render().el);
          AppState.set("hasGmap", true);
          Backbone.history.start();  
        });    
      }
    });
  }
  
  function initializeBindings() {
    el.$sidebar.on("scroll", function(e) {
      var posY = el.$sidebar.innerHeight() + el.$sidebar.scrollTop(),
          totalY = el.$sidebar[0].scrollHeight;
      
      if (posY >= totalY && listView.checkPagination()) {
        listView.retrieveNext();
      }
    });
    
    el.$form.on("submit", function(e) {
      var data = {
        term: el.$input.val(),
        lat: AppState.get("pos").lat,
        lng: AppState.get("pos").lng,
        page: 1
      };
      
      e.preventDefault();
      Router.navigate("/results/" + data.lat + ";" + data.lng + "/" + data.term + "/1", { trigger: true });  
    });
    
    Router.on("route:results", function(lat, lng, term, page) {
      var data = {
        lat: lat,
        lng: lng,
        term: term,
        page: page
      };
      AppState.set("term", data.term);
      AppState.set("pos", { lat: lat, lng: lng });
      AppState.set("isSearching", false);  
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
  
  var App = {
    initialize: function initialize() {
      activeItemsContainer = new ItemContainer({ url: paths.active });
      activeItemsCollection = activeItemsContainer.get("results");
      listView = new ListView({ model: activeItemsContainer, collection: activeItemsCollection });
      itemSummaryView = new ItemSummaryView({ model: activeItemsContainer });
      
      el.$sidebar
        .append(itemSummaryView.el)
        .append(listView.el);
  
      if ("geolocation" in navigator) {
        initializeGmap();
        initializeBindings();
      } else {
        displayGeolocationError();
      }
    },
    searchActive: function searchActive(data) {
      AppState.set("isSearching", true);
      activeItemsContainer.fetch({ data: data });  
    }
  };
  
  return App;
});