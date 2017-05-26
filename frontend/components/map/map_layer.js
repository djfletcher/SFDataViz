function createLayer(layerId, dataset) {
  let geoJSON = convertToGeoJSON(dataset);
  switch(layerId) {
    case 'crime-layer':
      return assembleLayerProperties(layerId, 'circle', geoJSON);
    default:
      console.log('Invalid layer id');
  }
}

function assembleLayerProperties(layerId, type, geoJSON) {
  let properties = {
    "id": layerId,
    "type": type,
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": geoJSON
      }
    },
    "paint": paintProperties[layerId],
    "layout": {
      "visibility": "visible"
    }
  };
  return properties;
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

const paintProperties = {
  'crime-layer': {
    'circle-radius': {
      'base': 1.75,
      'stops': [[12, 3], [22, 180]]
    },
    "circle-color": `#e55e5e`
    // 'circle-color': {
    //   'property': 'category',
    //   'type': 'categorical',
    //   'default': `#e55e5e`,
    //   'stops': [
    //     ['ARSON', 'blue'],
    //     ['ASSAULT', 'yellow'],
    //     ['BURGLARY', 'green'],
    //     ['DRIVING UNDER THE INFLUENCE', 'orange'],
    //     ['DRUG/NARCOTIC', 'white'],
    //     ['KIDNAPPING', 'black'],
    //     ['LARCENY/THEFT', 'purple'],
    //     ['PROSTITUTION', 'blue'],
    //     ['ROBBERY', 'yellow'],
    //     ['SEX OFFENSES, FORCIBLE', 'green'],
    //     ['SEX OFFENSES, NON FORCIBLE', 'orange'],
    //     ['STOLEN PROPERTY', 'white'],
    //     ['VEHICLE THEFT', 'black'],
    //     ['WEAPON LAWS', 'purple']
    //   ]
    // }
  }
};

export default createLayer;
