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

featureLayer.on('ready', function() {
	this.setStyle({
      "color": "#A3C682",
      "fillColor": "#39C654",
      "weight": 2.5,
      "opacity": 0.65
    });
  map.fitBounds(featureLayer.getBounds());
});

//featureLayer.on('ready', function() {
// 	this.eachLayer(function(layer) {
//    	layer.bindPopup('Welcome to ' + layer.feature.properties.LABEL);
//    });
//});

var clickHandler = function(e) {
  $('#info').empty();
  
  var feature = e.target.feature;
  
  $('#info').fadeIn(400, function() {
    var info = '';
    
    info += '<div>'
    info += 	'<h2>' + feature.properties.LABEL + '</h2>'
    info += 	'<p>' + feature.properties.LOCATION + '</p>'
    info += '</div>'
    
    $('#info').append(info);
  });
};

featureLayer.on('ready', function(){
    this.eachLayer(function(layer){
    	layer.on('click', clickHandler);
	});
});

map.on('click', function(e) {
  $('#info').fadeOut(200);
  $('#info').empty();
});

var myLocation = L.mapbox.featureLayer().addTo(map);

map.on('locationfound', function(e) {
	myLocation.setGeoJSON({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [e.latlng.lng, e.latlng.lat]
      },
      properties: {
        'title': 'Here I am!',
        'marker-color': '#ff8888',
        'marker-symbol': 'star'
      }
    });
});

map.locate({ setView:true });

//corpsmap-xenon.surge.sh -- Will's nightly build of the app he's working on right now.
// recommended JS: The good parts book, even though it's a bit older.
// follow people on twitter to learn more about js mapping.