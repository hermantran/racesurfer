define([
  "backbone",
  "state",
  "async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCSzrZvnw8n4yyw-cKVk7XEuXYSUD88g8w&sensor=false!callback"  
], function(Backbone, AppState) {
  "use strict";
  var GmapView = Backbone.View.extend({
    tagName: "div",
    className: "map",
    options: {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 11,
    },
    
    initialize: function() {
      
    },
    
    render: function() {
      this.options.center = new google.maps.LatLng(AppState.get("pos").lat, AppState.get("pos").lng);
      new google.maps.Map(this.el, this.options);
      return this;
    }
  });
  
  return GmapView;
});