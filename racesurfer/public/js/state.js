define([
  "backbone"
], function(Backbone) {
  var AppState = Backbone.Model.extend({
    defaults: {
      pos: {},
      gmap: false
    }
  });
  
  return new AppState();
});