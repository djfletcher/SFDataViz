import React from 'react';

const layer = function(dataset, map) {

}


function convertToGeoJSON(dataset) {
  return dataset.map(datum => {
    let { category, date, location } = datum;
    let geoJSON = {};
    geoJSON['type'] = 'Feature';
    geoJSON['geometry'] = {
      'type': 'Point',
      'coordinates': [location.longitude, location.latitude]
    },
    geoJSON['properties'] = { category, date };
    return geoJSON;
  });
}
