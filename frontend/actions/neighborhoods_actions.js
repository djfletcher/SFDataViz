import * as ApiUtil from '../util/neighborhoods_api_util';

export const RECEIVE_NEIGHBORHOODS = 'RECEIVE_NEIGHBORHOODS';

export const receiveNeighborhoods = neighborhoods => ({
  type: RECEIVE_NEIGHBORHOODS,
  neighborhoods
});

export const requestNeighborhoods = () => dispatch => (
  ApiUtil.fetchNeighborhoods()
         .then(hoods => dispatch(receiveNeighborhoods(hoods)))
);
