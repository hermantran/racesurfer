define([
  "backbone",
  "templates"
], function(Backbone, Templates) {
  "use strict";
  var ItemView = Backbone.View.extend({
    tagName: "li",
    template: Templates.item,
    
    initialize: function() {
      this.listenTo(this.model, "destroy", this.remove);
      this.render();
    },
    
    render: function() {
      var content = this.template(this.model.toJSON());
      this.$el.html(content).attr("data-cid", this.model.cid);
      return this;
    }
  });
  
  return ItemView;
});