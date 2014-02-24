define([
  "backbone"
], function(Backbone) {
  var AppState = Backbone.Model.extend({
    defaults: {
      term: '',
      pos: {},
      hasGeolocation: false,
      hasGmap: false,
      isSearching: false,
      activeItem: null
    }
  });
  
  return new AppState();
});