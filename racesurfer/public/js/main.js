(function($) {
	// Paths to controllers and images; unable to use Laravel paths
	var activeController = 'racesurfer/active';
	var flickrController = 'racesurfer/flickr';
	var customMarker = '../public/img/blue_dot_circle.png';

	// Initialize Underscore.js templating settings
	_.templateSettings.variable = "rc";
	var template1 = _.template( $("#resultsList-template").html() );
	var template2 = _.template( $("#resultsDetails-template").html() );

	// If geolocation, bind click of Geolocate button with AJAX request to Active API, and with load of Google Maps 
	if (navigator.geolocation) {
		$('#geolocate').on('click', function() {
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
				
				$resultsSidebar.html('').addClass('is-loading');
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
					$resultsSidebar.removeClass('is-loading').html(template1(results));
					$resultsDetails.html(template2(results));

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
						
						$resultsSidebar.find('.locate').eq(i).on('click', function() {
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
	$('#resultsSidebar').on('click','.details',function(e) {
		var $flickrPhotos = $('#flickrPhotos');

		$flickrPhotos.html('').addClass('is-loading');
	
		$.ajax({
			url: flickrController,
			type: 'GET',
			data: {
				searchTerm: searchTerm
			}
		}).done(function(results) {
			$('#flickrPhotos').removeClass('is-loading').html(results);
		});
	});
})(jQuery);