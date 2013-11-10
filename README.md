# ITP 404 Final Project - [RaceSurfer](http://racesurfer.aws.af.cm/)

### Project Topic and Goals
RaceSurfer is a single-page Web application that locates upcoming running race events near the user's current geographical coordinates. These events are then plotted on a Google Maps with corresponding event details provided on the left sidebar. The goal of the course project is to create a Web mashup integrating several available Web APIs while incorporating the Laravel 3 PHP MVC framework.

### Project Features
* Uses Laravel 3's Blade template engine to render the view
* Uses Backbone.js to organize the JavaScript into a Model-View-Collection pattern
* Uses RequireJS to separate code as modules and load libraries from CDNs with local fallbacks
* JS structure in [racesurfer/public/js/](https://github.com/hermantran/ITP404-Final-Project/tree/master/racesurfer/public/js)
* CSS follows [SMACSS](http://smacss.com/) rules and is compiled and compressed with Sass
* W3C Geolocation API to get current coordinates for Active API and Google Maps 
* Google Maps API to plot race coordinates and current location  
* Active API to get race results in JSON  
* Client-side templating with Underscore for Active API JSON results  