<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>RaceSurfer</title>
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Asap:400,400italic">
	<link rel="stylesheet" href="<?php echo URL::to_asset('css/main.css') ?>">
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
</head>

<body>
<div id="container">
	<div id="header">
		<span class="logo">RaceSurfer</span>
		<div class="form">
			<input type="text" id="searchTerm" placeholder="Enter a race event"/>
			<input type="button" id="geolocate" value="Geolocate"/>
		</div>
	</div>

	<div id="resultsSidebar"></div>

	<div id="resultsDetails"></div>

	<div id="resultsMap">
		<div id="mapCanvas"></div>
		<div id="flickrPhotos"></div>
		<div class="clear"></div>
	</div>

	<div class="clear"></div>
</div>

<script type="text/template" id="resultsList-template">
	<ul class="resultsList">
	<% _.each( rc._results, function(result) { %>
			<li> 
				<span class="title"> <%- result.title %> </span> <br>
				<%- result.meta.city %>, <%- result.meta.eventState %> |
				<%- result.meta.endDate.substring(0,10) %> <br>
				<a href='#' class="locate">Locate</a> <a href='#' class="moreInfo">More Info</a>
			</li>
	<% }); %>
	</ul>
</script>

<script type="text/template" id="resultsDetails-template">
	<div id="resultsAccordion" class="accordion">
	<% _.each( rc._results, function(result) { %>
			<div class="paneLabel">
				<h3> <%- result.title %> </h3>
			</div>
			<div class="paneContent"> 
				<p>
					<%- result.meta.endDate.substring(0,10) %> <br>
					<%- result.meta.eventAddress %> <br>
					<%- result.meta.city %>, <%- result.meta.eventState %> <br>
					<a href=' <%- result.url %> '>Register</a>
					<a href='<%- result.meta.eventUrl %>'>Event Page</a>
				</p>
				<p> <u>Overview</u>: <%- result.meta.allText %> </p>
				<p> <u>Description</u>: <%- result.meta.description %> </p>
				<p> <u>Events</u>: <%- result.meta.splitMediaType %> </p>
			</div>
	<% }); %>
	</div>
</script>

<script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="<?php echo URL::to_asset('js/underscore-min.js') ?>"></script>
<script src="<?php echo URL::to_asset('js/accordionConstructor.js') ?>"></script>
<script src="<?php echo URL::to_asset('js/main.js') ?>"></script>
</body>
</html>