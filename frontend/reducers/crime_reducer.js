import { RECEIVE_CRIMES } from '../actions/crime_actions';

const CrimeReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CRIMES:
      return state.concat(action.crimes);
    default:
      return state;
  }
};

export default CrimeReducer;
