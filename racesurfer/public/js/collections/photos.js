define([
  "backbone"
], function(Backbone) {
  "use strict";
  var PhotoCollection = Backbone.Collection.extend({
    initialize: function(attrs) {
      this.url = attrs.url;
    },
    
    
    parse: function(response) {
      console.log(response);
    }
  });
  
  return PhotoCollection;
});