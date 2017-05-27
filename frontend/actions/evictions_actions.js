import * as ApiUtil from '../util/evictions_api_util';

export const RECEIVE_EVICTIONS = 'RECEIVE_EVICTIONS';

export const receiveEvictions = evictions => ({
  type: RECEIVE_EVICTIONS,
  evictions
});

export const requestEvictions = () => dispatch => {
  for (let offset = 0; offset < 3; offset++) {
    ApiUtil.fetchEvictions(offset * 1000)
           .then(evictions => dispatch(receiveEvictions(evictions)));
  }
};
