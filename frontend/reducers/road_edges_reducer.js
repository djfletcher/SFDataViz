import { RECEIVE_ROAD_EDGES } from '../actions/road_edges_actions';

const RoadEdgesReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_ROAD_EDGES:
      return convertToGeoJSON(action.roadEdges);
    default:
      return state;
  }
};

function convertToGeoJSON(roadEdges) {
  return roadEdges.map((intersection1, intersection2) => {
    let geoJSON = {};
    geoJSON['type'] = 'Feature';
    geoJSON['geometry'] = {
      'type': 'LineString',
      'coordinates': [
        [intersection1['longitude'], intersection1['latitude']],
        [intersection2['longitude'], intersection2['latitude']]
      ]
    };
    return geoJSON;
  });
}

export default RoadEdgesReducer;
