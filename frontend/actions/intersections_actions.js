import * as ApiUtil from '../util/intersections_api_util';

export const RECEIVE_INTERSECTIONS = 'RECEIVE_INTERSECTIONS';

export const receiveIntersections = intersections => ({
  type: RECEIVE_INTERSECTIONS,
  intersections
});

export const requestIntersections = () => dispatch => {
  for (let i = 0; i < 6; i++) {
  ApiUtil.fetchIntersections(i * 5000)
         .then(intersections => dispatch(receiveIntersections(intersections)));
  }
};
