define([
  "backbone",
  "views/item",
  "state",
  "templates",
  "router"
], function(Backbone, ItemView, AppState, Templates, Router) {
  "use strict";
  var ListView = Backbone.View.extend({
    tagName: "div",
    template: Templates.itemList,
    
    initialize: function() {
      this.listenTo(this.model, "change:currentPage change:endPage", this.checkPagination);
      this.listenTo(this.collection, "add", this.addOne);
      this.listenTo(this.collection, "set", this.render);
      this.listenTo(this.collection, "remove", this.remove);
      
      this.$el.html(this.template());
      this.$ul = this.$el.find("ul");  
      this.$pagination = this.$el.find(".paginate");
      this.$loader = this.$el.find(".loader");
    },
    
    events: {
      "click a.title": "toggleItem",
      "click a.next": "triggerNext",
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
    
    triggerNext: function(e) {
      e.preventDefault();
      this.retrieveNext();
    },
      
    retrieveNext: function() {
      var pos = AppState.get("pos"),
          lat = pos.lat,
          lng = pos.lng,
          term = AppState.get("term"),
          page = this.model.get("currentPage") + 1;
      
      this.$loader.show();
      Router.navigate("/results/" + lat + ";" + lng + "/" + term + "/" + page, { trigger: true }); 
    },
    
    checkPagination: function() {
      if (this.model.get("currentPage") >= this.model.get("endPage")) {
        this.$pagination.hide();
        return false;
      } else {
        this.$pagination.show();  
        this.$loader.hide();
        return true;
      }
    },
    
    render: function() {
      this.collection.each(function(model) {
        this.addOne(model);
      });
    },
    
    addOne: function(model) {
      var itemView = new ItemView({ model: model });
      this.$ul.append(itemView.el);
    },
    
    remove: function(model) {
      model.trigger("destroy");  
    }
  });
  
  return ListView;
});