import { combineReducers } from 'redux';
import CrimeReducer from './crime_reducer';
import NeighborhoodReducer from './neighborhood_reducer';

const RootReducer = combineReducers({
  crime: CrimeReducer,
  neighborhoods: NeighborhoodReducer
});

export default RootReducer;
