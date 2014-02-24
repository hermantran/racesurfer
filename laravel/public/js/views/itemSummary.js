define([
  "backbone",
  "templates",
  "state"
], function(Backbone, Templates, AppState) {
  "use strict";
  var ItemSummaryView = Backbone.View.extend({
    tagName: "div",
    className: "summary text-center",
    template: Templates.itemSummary,
    
    initialize: function() {
      this.listenTo(AppState, "change:hasGeolcation change:hasGmap change:isSearching", this.changeState);
      this.listenTo(this.model, "change:count change:currentPage", this.render);
      this.el.innerHTML = "Click \"Allow\" when the Gelocation prompt appears.";
    },
    
    changeState: function() {
      var html;
      
      if (AppState.get("isSearching")) {
        html = "<img class=\"loader\" src=\"img/ajax-loader.gif\"> Loading...";
      }
      else if (AppState.get("hasGmap")) {
        html = "Enter a search term above to populate results.";
      }
      else if (AppState.get("hasGeolocation")) {
        html = "Google Maps initializing..."; 
      }
      
      this.el.innerHTML = html;
    },
    
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });
  
  return ItemSummaryView;
});