define([
  'backbone',
  'app',
], function(Backbone, App) {
  var Router = Backbone.Router.extend({
    routes: {
      "results/:latLng/:term": "results" 
    }
  }); 
 
  return new Router();
});