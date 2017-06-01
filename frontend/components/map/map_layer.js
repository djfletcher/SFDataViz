function createLayer(layerId, geoJSON) {
  switch(layerId) {
    case 'crime-layer':
      return assembleLayerProperties(layerId, 'circle', geoJSON);
      // return assembleLayerProperties(layerId, 'fill-extrusion', geoJSON);
    case 'neighborhood-fills-layer':
      return assembleLayerProperties(layerId, 'fill', geoJSON);
    case 'neighborhoods-invisible-layer':
      return assembleLayerProperties(layerId, 'fill', geoJSON);
    case 'neighborhood-outlines-layer':
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
  if (layerId === 'neighborhood-fills-layer') {
    properties['filter'] = ["==", "name", ""];
  }
  return properties;
}

const layoutProperties = {
  'crime-layer': {
    'visibility': 'visible'
  },
  'neighborhoods-invisible-layer': {
    'visibility': 'visible'
  },
  'neighborhood-fills-layer': {
    'visibility': 'visible'
  },
  'neighborhood-outlines-layer': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round'
  }
};

const paintProperties = {
  'crime-layer': {
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
  'neighborhood-outlines-layer': {
    'line-opacity': 1,
    'line-color': 'black',
    'line-width': {
      'stops': [[12, 3], [22, 1]]
    },
    'line-blur': {
      'stops': [[12, 3], [22, 2]]
    }
  },
  'neighborhoods-invisible-layer': {
    // neighborhoods should have fill color only when hovered
    'fill-opacity': 0,
    'fill-color': '#6699CC'
  },
  'neighborhood-fills-layer': {
    // neighborhoods should have fill color only when hovered
    'fill-opacity': 0.5,
    'fill-color': '#6699CC'
  }
};

export default createLayer;


// below is the beginnings of unfinished code to convert neighborhoods from an object
//  with names as keys back into a feature collection array

// function createLayer(layerId, dataset) {
//   switch(layerId) {
//     case 'crime-layer':
//       return assembleLayerProperties(layerId, 'circle', dataset);
//     case 'neighborhoods-invisible-layer':
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
