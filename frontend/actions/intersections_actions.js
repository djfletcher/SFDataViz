import * as ApiUtil from '../util/intersections_api_util';

export const RECEIVE_INTERSECTIONS = 'RECEIVE_INTERSECTIONS';

export const receiveIntersections = intersections => ({
  type: RECEIVE_INTERSECTIONS,
  intersections
});

export const requestIntersections = () => dispatch => (
  ApiUtil.fetchIntersections()
         .then(intersections => dispatch(receiveIntersections(intersections)))
);
