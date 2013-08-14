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
        <div class="span3 sidebar"></div>
        
        <div class="span9 map-container">
          <div class="map" id="gmap"></div>
        </div>
        
      </div>
    </section>
    
    <script>var paths = { active: "{{ URL::to_action("api@active") }}", flickr: "{{ URL::to_action("api@flickr") }}" };</script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script src="{{ URL::to_asset("bower_components/requirejs/require.js") }}" data-main="{{ URL::to_asset("js/main") }}"></script>
  </body>
</html>