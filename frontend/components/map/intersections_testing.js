import { points } from '../../../intersections_array_points';

function createLayer() {
  return assembleLayerProperties('intersections', 'circle', points);
}

function convertToGeoJSONArray(dataset) {
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
  'intersections': {
    'circle-radius': {
      'base': 1.75,
      'stops': [[12, 3], [22, 180]]
    },
    'circle-color': `blue`
  }
};

const layoutProperties = {
  'intersections': {
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

export default createLayer;
