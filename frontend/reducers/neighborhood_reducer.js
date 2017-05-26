import { RECEIVE_NEIGHBORHOODS } from '../actions/neighborhood_actions';

const NeighborhoodReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_NEIGHBORHOODS:
      return action.neighborhoods;
    default:
      return state;
  }
};

export default NeighborhoodReducer;
