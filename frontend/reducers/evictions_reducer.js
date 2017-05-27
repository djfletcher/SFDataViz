import { RECEIVE_EVICTIONS } from '../actions/evictions_actions';

const EvictionsReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_EVICTIONS:
      return state.concat(action.evictions);
    default:
      return state;
  }
};

export default EvictionsReducer;
