<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <title>RaceSurfer</title>
    <link rel="stylesheet" href="{{ URL::to_asset("css/bootstrap.min.css") }} ">
    <link rel="stylesheet" href="{{ URL::to_asset("css/styles.min.css") }}">
  </head>
  
  <body>
    <section class="search-bar">
      <div class="row-fluid shadow-bottom">
        <div class="span3 title">
          <h4><a href="{{ URL::current() }}">RaceSurfer</a></h4> 
        </div>
      
        <div class="span6 input-append">
          <input type="text" class="input-large not-rounded" placeholder="(e.g. 5K, 10K, Marathon)">
          <span class="add-on search" title="Search"><i class="icon-search"></i></span> 
        </div>
      
        <div class="span3 credits text-right">
          <a href="http://developer.active.com/">
            <img src="{{ URL::to_asset("img/power-by--drk.png") }}" alt="Powered by Active">
          </a>
        </div>
      </div>
    </section>
    
    <section class="content clear">
      <div class="row-fluid">
        <div class="span3 sidebar shadow-right"></div>
        <div class="span9 map-container"></div>
      </div>
    </section>
    
    <script>var paths = { active: "{{ URL::to_action("api@active") }}", flickr: "{{ URL::to_action("api@flickr") }}" };</script>
    <script src="{{ URL::to_asset("js/dist/main.min.js") }}"></script>
  </body>
</html>