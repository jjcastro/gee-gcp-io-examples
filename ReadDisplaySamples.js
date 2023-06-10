// Load the table asset
var table = ee.FeatureCollection('projects/river-sky-386919/assets/data_random');

// Create a function to visualize each point
var visualizePoint = function(feature) {
  var point = ee.Geometry.Point(feature.geometry().coordinates());
  var marker = ee.Feature(point, feature.get('properties'));
  return marker;
};

// Apply the visualization function to each feature in the table
var points = table.map(visualizePoint);

// Create a map and add the points
Map.addLayer(points, {}, 'Points');

// Center the map on the data
Map.centerObject(points);
