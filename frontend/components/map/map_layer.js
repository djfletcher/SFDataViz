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
    // 'fill-extrusion-height': 10,
    // 'fill-extrusion-color': `#e55e5e`
    //
    'circle-radius': {
      'base': 1.75,
      'stops': [[12, 3], [22, 180]]
    },
    'circle-color': `#e55e5e`
    //
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
    'line-color': '#e55e5e',
    'line-width': {
      'stops': [[12, 2], [22, 10]]
    }
  }
};

export default createLayer;


// below is the beginnings of unfinished code to convert neighborhoods from an object
//  with names as keys back into a feature collection array

// function createLayer(layerId, dataset) {
//   switch(layerId) {
//     case 'crime':
//       return assembleLayerProperties(layerId, 'circle', dataset);
//     case 'neighborhoods':
//       let neighborhoodsArray = [];
//       for (let hood in dataset) {
//         let geoJSON = {};
//         console.log(hood);
//         neighborhoodsArray.push();
//       }
//       return assembleLayerProperties(layerId, 'line', dataset);
//     default:
//       console.log('Invalid layer id');
//   }
// }
