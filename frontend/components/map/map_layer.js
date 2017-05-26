function createLayer(layerId, geoJSON) {
  switch(layerId) {
    case 'crime-layer':
      return assembleLayerProperties(layerId, 'circle', geoJSON);
    case 'neighborhoods-layer':
      return assembleLayerProperties(layerId, 'line', geoJSON);
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
    "layout": layoutProperties[layerId]
  };
  return properties;
}

const layoutProperties = {
  'crime-layer': {
    'visibility': 'visible'
  },
  'neighborhoods-layer': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round'
  }
};

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
  },
  'neighborhoods-layer': {
    // neighborhoods should have fill color only when hovered
    // 'fill-color': 'rgba(0,0,0,0)',
    // 'fill-outline-color': 'black'
    'line-opacity': 1,
    'line-color': 'black',
    'line-width': {
      'stops': [[12, 3], [22, 1]]
    },
    'line-blur': {
      'stops': [[12, 3], [22, 2]]
    }
  }
};

export default createLayer;
