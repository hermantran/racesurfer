# ITP 404 Final Project - Herman Tran

## 1. Laravel MVC Framework
* Model: None (no database used)
* View: applications/views/surf.php 
* Controller: applications/controllers/racesurfer.php

## 2. REST Web Service
* Active API to get race results in JSON
: Located at applications/libraries/active.php

## 3. Another Web Service
* Google Maps API to plot race coordinates and current location
: Located at applications/views/surf.php

## 4. AJAX using jQuery
* AJAX call to active.php to load race results
: Located at public/js/main.js (line 37-48) 
* AJAX call to flickr.php to load race-related photos
: Located at public/js/main.js (line 168-176)

## 5. jQuery Page Interactivity
* Can open Google Maps Infowindows by clicking Locate for each result
: Located at public/js/main.js (line 90-92) 
* Can toggle (and animate) appearance of the #resultsDetails div by clicking More Info for each result
: Located at public/js/main.js (line 132-164)

## 6. Extras
* W3C Geolocation API to get current coordinates for Active API and Google Maps
: Located at public/js/main.js (line 28-32)
* Client-side templating with Underscore for Active API JSON results
: Located at applications/views/surf.php (line 36-73)
* Use of custom constructor function for Accordion in #resultsDetails div
: Located at public/js/accordionConstructor.js
* Extra REST web service: Flickr API at applications/libraries/flickr.php
: Located at applications/libraries/flickr.php

### Comments
* Sometimes, the pathing in public/js/main.js (line 3-5) to the controller can become incorrect. It can switch between needing the 'racesurfer/' folder path and not.