define([
  "backbone",
], function(Backbone) {
  var ItemModel = Backbone.Model.extend({
    idAttribute: "meta.assetId"  
  });
  
  return ItemModel;
});