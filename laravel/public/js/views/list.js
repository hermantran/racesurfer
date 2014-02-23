define([
  "backbone",
  "views/item",
  "state"
], function(Backbone, ItemView, AppState) {
  "use strict";
  var ListView = Backbone.View.extend({
    tagName: "ul",
    className: "nav nav-stacked nav-pills nav-styled",
    
    initialize: function() {
      this.listenTo(this.collection, "add", this.addOne);
      this.listenTo(this.collection, "set", this.render);
      this.listenTo(this.collection, "remove", this.remove);
    },
    
    events: {
      "click a": "toggleItem"   
    },
    
    toggleItem: function(e) {
      var $item = $(e.currentTarget).parent(),
          cid = $item.attr('data-cid');
      
      e.preventDefault();
      
      if (AppState.get("activeItem") === cid) {
        cid = null;  
      }
      AppState.set("activeItem", cid);
      
      $item.find('i')
        .toggleClass("icon-chevron-down")  
        .closest("li")
          .find("div.details")
            .slideToggle(1000);
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