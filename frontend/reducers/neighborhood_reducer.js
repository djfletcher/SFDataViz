import { RECEIVE_NEIGHBORHOODS } from '../actions/neighborhood_actions';

const NeighborhoodReducer = (state = [], action) => {
  Object.freeze(state);
  let geoJSON;

  switch(action.type) {
    case RECEIVE_NEIGHBORHOODS:
    geoJSON = convertToGeoJSON(action.neighborhoods);
      return geoJSON;
    default:
      return state;
  }
};


function convertToGeoJSON(dataset) {
  return dataset.map(datum => {
    let { nhood, the_geom } = datum;
    let geoJSON = {};
    geoJSON['type'] = 'Feature';
    geoJSON['geometry'] = the_geom;
    geoJSON['properties'] = { name: nhood };
    return geoJSON;
  });
}

export default NeighborhoodReducer;
