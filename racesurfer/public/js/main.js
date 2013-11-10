require.config({
  baseUrl: 'js/',
  
  paths: {
    jquery: ["http://code.jquery.com/jquery-1.10.1.min", "../bower_components/jquery/jquery.min"],
    underscore: ["http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min", "../bower_components/underscore/underscore-min"],
    backbone: ["http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min", "../bower_components/backbone/backbone-min"],
    async: "lib/async"
  },
  
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    }
  }
});

require([
  "app",
  "async"
], function(App) {
  App.initialize();
});