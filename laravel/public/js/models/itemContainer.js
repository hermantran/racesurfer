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
      var currentPage = Math.ceil(response.endIndex / response.pageSize),
          endPage = Math.ceil(response.numberOfResults / response.pageSize),
          count = response.numberOfResults;
      
      if (currentPage > 1) {
        this.get("results").add(response._results);
      } else {
        this.get("results").set(response._results);
      }
      
      return {
        currentPage: currentPage,
        endPage: endPage,
        count: count
      };
    }
  });
  
  return ItemContainer;
});