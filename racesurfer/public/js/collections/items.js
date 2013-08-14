define([
  "backbone"
], function(Backbone) {
  "use strict";
  var ItemsCollection = Backbone.Collection.extend({
    initialize: function(attrs) {
      this.url = attrs.url;
    },
    
    // Active API returns object { _results : [], endIndex: 30, numberOfResults: 67, pageSize: 30, searchTime: 30 }
    parse: function(response) {
      return response._results;  
    }
  });
  
  return ItemsCollection;
});