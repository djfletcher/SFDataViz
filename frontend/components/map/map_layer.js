function createLayer(layerId, geoJSON) {
  switch(layerId) {
    case 'crime':
      return assembleLayerProperties(layerId, 'circle', geoJSON);
      // return assembleLayerProperties(layerId, 'fill-extrusion', geoJSON);
    case 'neighborhood-fills':
      return assembleLayerProperties(layerId, 'fill', convertToArray(geoJSON));
    case 'neighborhoods':
      return assembleLayerProperties(layerId, 'fill', convertToArray(geoJSON));
    case 'neighborhood-outlines':
      return assembleLayerProperties(layerId, 'line', convertToArray(geoJSON));
    case 'road-edges':
      return assembleLayerProperties(layerId, 'line', geoJSON);
    case 'intersections':
      return assembleLayerProperties(layerId, 'circle', Object.values(geoJSON));
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
  if (layerId === 'neighborhood-fills') {
    properties['filter'] = ["==", "name", ""];
  }
  return properties;
}

function convertToArray(obj) {
  let arr = [];
  for (let key in obj) {
    obj[key].properties = {
      'name': key
    };
    arr.push(obj[key]);
  }
  return arr;
}

const layoutProperties = {
  'crime': {
    'visibility': 'visible'
  },
  'neighborhoods': {
    'visibility': 'visible'
  },
  'neighborhood-fills': {
    'visibility': 'visible'
  },
  'neighborhood-outlines': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round'
  },
  'road-edges': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round'
  },
  'intersections': {
    'visibility': 'visible'
  }
};

const paintProperties = {
  'crime': {
    'circle-radius': {
      'base': 1.75,
      'stops': [[12, 3], [22, 180]]
    },
    'circle-color': `#e55e5e`
  },
  'neighborhood-outlines': {
    'line-opacity': 1,
    'line-color': 'black',
    'line-width': {
      'stops': [[12, 3], [22, 1]]
    },
    'line-blur': {
      'stops': [[12, 3], [22, 2]]
    }
  },
  'neighborhoods': {
    'fill-opacity': 0
  },
  'neighborhood-fills': {
    // neighborhoods should have fill color only when hovered
    'fill-opacity': 0.5,
    'fill-color': '#6699CC'
  },
  'intersections': {
    'circle-radius': {
      'base': 1.75,
      'stops': [[12, 3], [22, 180]]
    },
    'circle-color': `#0a2b58`
  },
  'road-edges': {
    'line-opacity': 1,
    'line-color': '#96e596',
    'line-width': {
      'stops': [[12, 1], [22, 5]]
    }
  }
};

export default createLayer;
