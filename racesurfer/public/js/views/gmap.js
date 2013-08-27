define([
  "backbone",
  "templates",
  "state",
  "async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCSzrZvnw8n4yyw-cKVk7XEuXYSUD88g8w&sensor=false!callback"  
], function(Backbone, Templates, AppState) {
  "use strict";
  var GmapView = Backbone.View.extend({
    tagName: "div",
    className: "map",
    markers: {},
    infowindows: {},
    listeners: {},
    options: {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 11,
    },
    
    initialize: function() {
      this.listenTo(this.collection, "add", this.addMarker);
      this.listenTo(this.collection, "remove", this.removeMarker);
    },
    
    addMarker: function(model) {
      var self = this;
      
      this.markers[model.cid] = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(model.get("meta").eventLatitude, model.get("meta").eventLongitude),
        title: model.get("title")
      });

      this.infowindows[model.cid] = new google.maps.InfoWindow({
        content: Templates.infowindow(model.toJSON()),
        maxWidth: 200
      });
      
      this.listeners[model.cid] = google.maps.event.addListener(this.markers[model.cid], "click", function() {
        self.infowindows[model.cid].open(self.map, self.markers[model.cid]);
      });
    },
    
    removeMarker: function(model) {
      if (this.markers[model.cid]) {
        this.markers[model.cid].setMap(null);
        this.infowindows[model.cid] = null;
        google.maps.event.removeListener(this.listeners[model.cid]);
        
        delete this.markers[model.cid];
        delete this.infowindows[model.cid];
        delete this.listeners[model.cid];
      }
    },
    
    render: function() {
      this.options.center = new google.maps.LatLng(AppState.get("pos").lat, AppState.get("pos").lng);
      this.map = new google.maps.Map(this.el, this.options);
      return this;
    }
  });
  
  return GmapView;
});