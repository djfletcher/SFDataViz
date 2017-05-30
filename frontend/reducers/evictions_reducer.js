import { RECEIVE_EVICTIONS } from '../actions/evictions_actions';

const EvictionsReducer = (state = [], action) => {
  Object.freeze(state);
  let geoJSON;
  if (action.type !== RECEIVE_EVICTIONS) { debugger; }
  switch(action.type) {
    case RECEIVE_EVICTIONS:
      geoJSON = convertToGeoJSONArray(action.evictions);
      return state.concat(geoJSON);
    default:
      return state;
  }
};

function convertToGeoJSONArray(dataset) {
  return dataset.map(datum => {
    let { file_date, neighborhood, location } = datum;
    let geoJSON = {};
    geoJSON['type'] = 'Feature';
    geoJSON['geometry'] = location;
    geoJSON['properties'] = { date: file_date, neighborhood };
    return geoJSON;
  });
}

export default EvictionsReducer;
