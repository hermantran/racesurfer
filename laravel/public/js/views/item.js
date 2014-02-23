define([
  "backbone",
  "templates",
  "state"
], function(Backbone, Templates, AppState) {
  "use strict";
  var ItemView = Backbone.View.extend({
    tagName: "li",
    template: Templates.item,
    
    initialize: function() {
      this.listenTo(this.model, "destroy", this.remove);
      this.render();
    },
    
    render: function() {
      this.model.set("startDate", new Date(this.model.get("meta").startDate).toLocaleDateString());
      this.model.set("startTime", new Date(this.model.get("meta").startDate + ' ' + this.model.get("meta").startTime).toLocaleTimeString());
      var content = this.template(this.model.toJSON());
      this.$el.html(content).attr("data-cid", this.model.cid);
      return this;
    }
  });
  
  return ItemView;
});