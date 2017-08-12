import merge from 'lodash.merge';
import { RECEIVE_INTERSECTIONS } from '../actions/intersections_actions';

const IntersectionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type) {
    case RECEIVE_INTERSECTIONS:
      return merge(newState, convertToGeoJSONObject(action.intersections));
    default:
      return state;
  }
};

// convert to object with id as key, so that we can index directly into them by id
function convertToGeoJSONObject(intersections) {
  let result = {};
  intersections.forEach(point => {
    result[point['id']] = convertToGeoJSON(point);
  });
  return result;
}

function convertToGeoJSON(point) {
  let geoJSON = {};
  let longitude = point['longitude'];
  let latitude = point['latitude'];
  geoJSON['type'] = 'Feature';
  geoJSON['geometry'] = {
    'type': 'Point',
    'coordinates': [longitude, latitude]
  };
  return geoJSON;
}

export default IntersectionsReducer;
