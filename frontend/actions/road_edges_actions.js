import * as ApiUtil from '../util/road_edges_api_util';

export const RECEIVE_ROAD_EDGES = 'RECEIVE_ROAD_EDGES';

export const receiveRoadEdges = roadEdges => ({
  type: RECEIVE_ROAD_EDGES,
  roadEdges
});

export const requestRoadEdges = () => dispatch => {
  for (let i = 0; i < 9; i++) {
  ApiUtil.fetchRoadEdges(i * 5000)
         .then(roadEdges => dispatch(receiveRoadEdges(roadEdges)));
  }
};
