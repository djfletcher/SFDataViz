import { RECEIVE_NEIGHBORHOODS } from '../actions/neighborhoods_actions';

const NeighborhoodReducer = (state = {}, action) => {
  Object.freeze(state);
  let geoJSON;

  switch(action.type) {
    case RECEIVE_NEIGHBORHOODS:
      return convertToGeoJSON(action.neighborhoods);
    default:
      return state;
  }
};

// convert neighborhoods to object with name as key, so that we can index directly into them by name
function convertToGeoJSON(dataset) {
  let neighborhoods = {};
  dataset.forEach(datum => {
    let { nhood, the_geom } = datum;
    let geoJSON = {};
    geoJSON['type'] = 'Feature';
    geoJSON['geometry'] = the_geom;
    neighborhoods[nhood] = geoJSON;
  });

  return neighborhoods;
}

export default NeighborhoodReducer;
