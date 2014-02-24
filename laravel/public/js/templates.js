define([
  "underscore"
], function() {
  "use strict";
  var Templates = {};
  
  Templates.item = [
    '<a class="title" href="#">',
      '<i class="icon-chevron-right pull-right"></i>',
      '<%= title %> <br>',  
    '</a>',
    '<div class="info"> <%= meta.city %>, <%= meta.eventState %> - <%= startDate %> <%= startTime %> </div>',
    '<div class="details hide"> <a href="<%= url %>" target="_blank">Register</a> <br> <%= meta.allText %> </div>'
  ];
  
  Templates.itemSummary = [
    'Your search returned <%= count %> results.'  
  ];
  
  Templates.loader = [
    '<img class="loader" src="img/ajax-loader.gif"> Loading...'
  ];
  
  Templates.itemList = [
    '<ul class="nav nav-stacked nav-pills nav-styled"></ul>',
    '<div class="text-center paginate summary">',
      '<a href="#" class="next">Next</a>',
      '<img class="loader hide" src="img/ajax-loader.gif">',
    '</div>'
  ];
  
  Templates.infowindow = [
    '<a href="<%= url %>" target="_blank">',
      '<h5 class="no-padding no-margin"> <%= title %> </h5>', 
    '</a>', 
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