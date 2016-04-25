// Here is the javascript setup for a basic map:

// Enter your mapbox map id here to reference it for the base layer,
// this one references the ugly green map that I made.
// Edited to include my ID and a nicer looking map.
var mapId = 'dirktall04.pp97i5l1';

// And this is my access token, use yours.
var accessToken = 'pk.eyJ1IjoiZGlya3RhbGwwNCIsImEiOiJjaW5nMWdyYjExYXRndjBrdmQ5ZjBqNHB4In0.sypnIaPia-_70133zJIJ0w';

// Create the map object with your mapId and token, 
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view of the map to the whole US
map.setView([39, -96], 4);

// Great, now we have a basic web map!

var dataFileToAdd = 'data/parks.geojson';

var featureLayer = L.mapbox.featureLayer();
featureLayer.loadURL(dataFileToAdd);
featureLayer.addTo(map);
//      "color": "#98F623",
//      "fillColor": "#65F654",


featureLayer.on('ready', function() {
	this.setStyle({
      "color": "orange",
      "fillColor": "yellow",
      "weight": 2.5,
      "opacity": 0.65
    });
  map.fitBounds(featureLayer.getBounds());
});