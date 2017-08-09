import { RECEIVE_INTERSECTIONS } from '../actions/intersections_actions';

const IntersectionsReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_INTERSECTIONS:
      return convertToGeoJSON(action.intersections);
    default:
      return state;
  }
};

function convertToGeoJSON(intersections) {
  return intersections.map(point => {
    let geoJSON = {};
    let longitude = point['longitude'];
    let latitude = point['latitude'];
    geoJSON['type'] = 'Feature';
    geoJSON['geometry'] = {
      'type': 'Point',
      'coordinates': [longitude, latitude]
    };
    return geoJSON;
  });
}

export default IntersectionsReducer;
