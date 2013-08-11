<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <title>RaceSurfer</title>
    <link rel="stylesheet" href="{{ URL::to_asset("bower_components/bootstrap/docs/assets/css/bootstrap.min.css") }}">
    <link rel="stylesheet" href="{{ URL::to_asset("css/styles.min.css") }}">
  </head>
  
  <body>
    <section class="search-bar">
      <div class="row-fluid">
        <div class="span3 title">
          <h4><a href="#">RaceSurfer</a></h4> 
        </div>
      
        <div class="span7 input-append">
          <input type="text" class="input-large not-rounded">
          <span class="add-on"  title="Search"><i class="icon-search"></i></span> 
        </div>
      
        <div class="span2 credits text-right">
          Powered By Active
        </div>
      </div>
    </section>
    
    <section class="content clear">
      <div class="row-fluid">
        <div class="span3 sidebar">
          
          <ul class="nav nav-stacked nav-pills nav-styled">
            <li><a href="#"><i class="icon-chevron-right pull-right" title="Learn more"></i><button class="btn btn-mini pull-right" title="Geolocate"><i class="icon-map-marker"></i></button>Some content</a></li>
            <li><a href="#"><i class="icon-chevron-right pull-right"></i>Another race</a></li>
          </ul>
        </div>
        
        <div class="span9 map-container">
          <div class="map" id="gmap"></div>
        </div>
        
      </div>
    </section>
    
    <script>
      var App = {
        paths: {
          active: "{{ URL::to_action("home@active") }}",
          flickr: "{{ URL::to_action("home@flickr") }}"
        }
      };
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.8/require.min.js" data-main="js/main"></script>
  </body>
</html>