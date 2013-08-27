define([
  "backbone",
  "views/item"
], function(Backbone, ItemView) {
  "use strict";
  var ListView = Backbone.View.extend({
    tagName: "ul",
    className: "nav nav-stacked nav-pills nav-styled",
    
    initialize: function() {
      this.listenTo(this.collection, "add", this.addOne);
      this.listenTo(this.collection, "set", this.render);
      this.listenTo(this.collection, "remove", this.remove);
      
      this.$el.on("click", 'i', function() {
        $(this)
          .toggleClass("icon-chevron-down")  
          .closest("li")
            .find("div.details")
              .slideToggle(1000);
      });
    },
    
    render: function() {
      this.$el.empty();
      
      this.collection.each(function(model) {
        this.addOne(model);
      });
    },
    
    addOne: function(model) {
      var itemView = new ItemView({ model: model });
      this.el.appendChild(itemView.el);
    },
    
    remove: function(model) {
      model.trigger("destroy");  
    }
  });
  
  return ListView;
});