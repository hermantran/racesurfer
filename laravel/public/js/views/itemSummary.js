define([
  "backbone",
  "templates"
], function(Backbone, Templates) {
  "use strict";
  var ItemSummaryView = Backbone.View.extend({
    tagName: "div",
    className: "summary text-center",
    template: Templates.itemSummary,
    
    initialize: function() {
      this.listenTo(this.collection, "all", this.render);
      this.el.innerHTML = "Click \"Allow\" when the Gelocation prompt appears.";
    },
    
    render: function() {
    }
  });
  
  return ItemSummaryView;
});