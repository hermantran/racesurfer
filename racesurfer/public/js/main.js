(function() {
	// Paths to controllers and images; unable to use Laravel paths
	var activeController = 'racesurfer/active';
	var flickrController = 'racesurfer/flickr';
	var customMarker = '../public/img/blue_dot_circle.png';

	// Initialize Underscore.js templating settings
	_.templateSettings.variable = "rc";

	var template1 = _.template(
		$("script.template1").html()
	);
	
	var template2 = _.template(
		$("script.template2").html()
	);

	// If geolocation, bind click of Geolocate button with AJAX request to Active API, and with load of Google Maps 
	if (navigator.geolocation) {
		$('#geolocate').on('click', function(e) {
			e.preventDefault();
			var located = {};
			var searchTerm = $('#searchTerm').val();
			var $resultsSidebar = $('#resultsSidebar');
			var $resultsDetails = $('#resultsDetails');
			
			// Initialize within async navigation.geolocation function because must pass coordinates to Active API and Google Maps
			navigator.geolocation.getCurrentPosition(function(position) {
				located = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				
				$resultsSidebar.html('').addClass('loading');
				$resultsDetails.html('');
			
				$.ajax({
					url: activeController,
					type: 'GET',
					data: {
						searchTerm: searchTerm,
						lat: located.lat,
						lng: located.lng
					}
				}).done(function(jsonString) {
					results = JSON.parse(jsonString);
					$resultsSidebar.removeClass('loading').html(template1(results));
					$resultsDetails.html(template2(results));
					
					var details = new Accordion({
						id: '#resultsAccordion',
						speed: 300
					});

					var current = new google.maps.LatLng(located.lat, located.lng);
		
					var myOptions = {
						zoom: 11,
						center: current,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
				
					var map = new google.maps.Map(document.getElementById('mapCanvas'), myOptions);
			
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(located.lat, located.lng),
						map: map,
						icon: customMarker,
						title: "Current Location"
					});
					
					$.each(results._results, function(i, result) {
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(result.meta.latitude, result.meta.longitude),
							map: map
						});
						
						var infoContent = result.title + '<br><br>' + result.meta.eventAddress + '<br>' + result.meta.city + ', ' + result.meta.eventState;
						
						var infowindow = new google.maps.InfoWindow({
							content: infoContent,
							maxWidth: 150,
							maxHeight: 60
						});
						
						google.maps.event.addListener(marker, 'click', function() {
							infowindow.open(map, marker);
						});
						
						$resultsSidebar.find('a.locate').eq(i).on('click', function() {
							infowindow.open(map, marker);
						});
					});
			
					var geocoder = new google.maps.Geocoder();
					var param1 = {
						'location': current
					};
				
					geocoder.geocode(param1, function(results) {
						var currentAddress = results[0].formatted_address
				
						var infowindow = new google.maps.InfoWindow({
							content: currentAddress,
							maxWidth: 120
						});
			
						google.maps.event.addListener(marker, 'click', function() {
							infowindow.open(map, marker);
						});
					});
				});
			});
		});
	} else {
		$('#searchSidebar').append('Geolocation is not supported in this browser.');
	}
	
	// Bind click of each More Info link with AJAX request to Flickr API
	$('#resultsSidebar').on('click','a',function(e) {
		e.preventDefault();
	}).on('click','a.moreInfo',function() {
		var $this = $(this);
		var $parent = $this.parent();
		var searchTerm = $parent.find('span.title').text();
		var $resultsSidebar = $('#resultsSidebar');
		var $resultsDetails = $('#resultsDetails');
		var $resultsMap = $('#resultsMap');
		var $mapCanvas = $('#mapCanvas');
		var $flickrPhotos = $('#flickrPhotos');

		if ($parent.hasClass('active')) {
			$parent.removeClass('active');

			$resultsMap.animate({width: '74%',});
			$resultsDetails.css({
				overflow: 'hidden',
				width: '1px',
				border: '0',
				display: 'none'
			});
			
			$mapCanvas.animate({height: '100%'});
			$flickrPhotos.html('').animate({height: '1px'});
		} else {
			$resultsSidebar.find('li').removeClass('active');
			$parent.addClass('active');
			
			var index = $resultsSidebar.find('a.moreInfo').index(this);
			$resultsDetails.find('div.paneLabel').eq(index).click();
			
			if ($resultsDetails.css('display') === 'none') {
				$resultsMap.animate({width: '30%',});
				
				$resultsDetails.css({
					display: 'block',
					overflowY: 'auto',
					borderRight: '1px solid #dddddd'
				}).animate({width: '44%'});
				
				// #mapCanvas and #flickrPhotos must take up 100% of #resultsMap
				$mapCanvas.animate({height: '30%'});
				$flickrPhotos.animate({height: '70%'});
			}
			
			$flickrPhotos.html('').addClass('loading');
		
			$.ajax({
				url: flickrController,
				type: 'GET',
				data: {
					searchTerm: searchTerm
				}
			}).done(function(results) {
				$('#flickrPhotos').removeClass('loading').html(results);
			});
		}
	});
})(jQuery);