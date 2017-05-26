import { RECEIVE_CRIMES } from '../actions/crime_actions';

const CrimeReducer = (state = [], action) => {
  Object.freeze(state);
  let geoJSON;

  switch(action.type) {
    case RECEIVE_CRIMES:
      geoJSON = convertToGeoJSONArray(action.crimes);
      return state.concat(geoJSON);
    default:
      return state;
  }
};

function convertToGeoJSONArray(dataset) {
  return dataset.map(datum => {
    let { category, date, location } = datum;
    let geoJSON = {};
    geoJSON['type'] = 'Feature';
    geoJSON['geometry'] = {
      'type': 'Point',
      'coordinates': [location.longitude, location.latitude]
    },
    geoJSON['properties'] = { category, date };
    return geoJSON;
  });
}

export default CrimeReducer;
