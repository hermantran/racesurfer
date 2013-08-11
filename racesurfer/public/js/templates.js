define([
  "underscore"
], function() {
  "use strict";
  var Templates = {};
  
  Templates.item = [
    '<a href="#">',
      '<%= name %>',
      '<i class="icon-chevron-right pull-right"></i>',
    '</a>'
  ];
  
  for (var tmpl in Templates) {
    if (Templates.hasOwnProperty(tmpl) ) {
      var tmplString = Templates[tmpl].join('\n');
      Templates[tmpl] = _.template(tmplString);    
    }
  }
  
  return Templates;
});