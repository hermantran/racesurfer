define([
  "backbone",
  "models/item"
], function(Backbone, ItemModel) {
  "use strict";
  var ItemsCollection = Backbone.Collection.extend({
    model: ItemModel
  });
  
  return ItemsCollection;
});