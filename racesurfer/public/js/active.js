define([
  "jquery"
], function() {
  "use strict";
  var Active = function(opts) {
    this.url = opts.url;
  };
    
  Active.prototype.search = function(opts) {
      $.ajax({
        context: this,
        type: "GET",
        dataType: "json",
        url: this.url,
        data: opts.data,
        success: opts.success
      });
    }
  };
  
  return Active;
});