define([
  'backbone',
  'app',
], function(Backbone, App) {
  var Router = Backbone.Router.extend({
    routes: {
      "results/:lat;:lng/:term/:page": "results" 
    }
  }); 
 
  return new Router();
});