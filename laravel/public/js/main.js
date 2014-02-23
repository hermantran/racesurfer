require.config({
  baseUrl: 'js/',
  
  paths: {
    jquery: ["http://code.jquery.com/jquery-1.10.1.min", "bower_components/jquery/jquery.min"],
    underscore: ["http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min", "bower_components/underscore/underscore-min"],
    backbone: ["http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min", "bower_components/backbone/backbone-min"],
    async: "lib/async",
    infinitescroll: "lib/jquery.infinitescroll.min"
  },
  
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    infinitescroll: {
      deps: ["jquery"],
      exports: "$.fn.infinitescroll"
    }
  },
  
  urlArgs: "bust=" + new Date().getTime()
});

require([
  "app",
  "async"
], function(App) {
  App.initialize();
});