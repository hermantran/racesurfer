define([
  "underscore"
], function() {
  "use strict";
  var Templates = {};
  
  Templates.item = [
    '<a href="#">',
      '<i class="icon-chevron-right pull-right"></i>',
      '<%= title %> <br>',  
    '</a>',
    '<div class="info"> <%= meta.city %>, <%= meta.eventState %> - <%= startDate %> <%= startTime %> </div>',
    '<div class="details hide"> <%= meta.allText %> </div>'
  ];
  
  Templates.itemSummary = [
    'Your search returned <%= count %> results.'  
  ];
  
  Templates.loader = [
    '<img class="loader" src="img/ajax-loader.gif"> Loading...'
  ];
  
  Templates.infowindow = [
    '<h5 class="no-padding no-margin"> <%= title %> </h5>', 
    '<%= meta.eventAddress %> <br>', 
    '<%= meta.city %>, <%= meta.eventState %>'
  ];
  
  for (var tmpl in Templates) {
    if (Templates.hasOwnProperty(tmpl) ) {
      var tmplString = Templates[tmpl].join('\n');
      Templates[tmpl] = _.template(tmplString);    
    }
  }
  
  return Templates;
});