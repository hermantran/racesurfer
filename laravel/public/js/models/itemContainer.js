define([
  "backbone",
  "collections/items"
], function(Backbone, ItemsCollection) {
  "use strict";
  var ItemContainer = Backbone.Model.extend({
    defaults: {
      results: new ItemsCollection(),
      currentPage: 0,
      endPage: 0,
      count: 0
    },
    
    initialize: function(attrs) {
      this.url = attrs.url;  
    },
    
    parse: function(response) {
      this.get("results").set(response._results);
      return {
        currentPage: 1,
        endPage: Math.ceil(response.numberOfResults / response.pageSize),
        count: response.numberOfResults
      };
    }
  });
  
  return ItemContainer;
});