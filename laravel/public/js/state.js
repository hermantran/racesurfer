define([
  "backbone"
], function(Backbone) {
  var AppState = Backbone.Model.extend({
    defaults: {
      pos: {},
      gmap: false,
      activeItem: null
    }
  });
  
  return new AppState();
});