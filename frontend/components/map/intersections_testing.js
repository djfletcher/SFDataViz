
function createIntersectionsLayer(points) {
  // let data = convertToGeoJSONArray(points);
  return assembleLayerProperties('intersections123', 'circle', points);
}

function convertToGeoJSONArray(dataset) {
  // debugger;
  return dataset.map(point => {
    let geoJSON = {};
    geoJSON['type'] = 'Feature';
    geoJSON['geometry'] = {
      'type': 'Point',
      'coordinates': point
    };
    return geoJSON;
  });
}

const paintProperties = {
  'intersections123': {
    'circle-radius': {
      'base': 1.75,
      'stops': [[12, 3], [22, 180]]
    },
    'circle-color': `#e55e5e`
  }
};

const layoutProperties = {
  'intersections123': {
    'visibility': 'visible'
  }
};

function assembleLayerProperties(layerId, type, geoJSON) {
  let properties = {
    "id": layerId,
    "type": type,
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": convertToGeoJSONArray(geoJSON)
      }
    },
    "paint": paintProperties[layerId],
    "layout": layoutProperties[layerId]
  };
  return properties;
}

export default createIntersectionsLayer;
