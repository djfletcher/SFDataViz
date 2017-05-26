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

// below is code to convert neighborhoods array to an object with name as key
// so that we can index directly into it in the state by name

// const NeighborhoodReducer = (state = [], action) => {
//   Object.freeze(state);
//   let geoJSON;
//
//   switch(action.type) {
//     case RECEIVE_NEIGHBORHOODS:
//       geoJSON = convertToGeoJSON(action.neighborhoods);
//       return geoJSON;
//     default:
//       return state;
//   }
// };
//
// // convert neighborhoods to object with name as key, so that we can index directly into them by name
// function convertToGeoJSON(dataset) {
//   let neighborhoods = {};
//   dataset.forEach(datum => {
//     let { nhood, the_geom } = datum;
//     let geoJSON = {};
//     geoJSON['type'] = 'Feature';
//     geoJSON['geometry'] = the_geom;
//     neighborhoods[nhood] = geoJSON;
//   });
//
//   return neighborhoods;
// }
