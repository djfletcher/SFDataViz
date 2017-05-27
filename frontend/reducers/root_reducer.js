import { combineReducers } from 'redux';
import CrimeReducer from './crime_reducer';
import NeighborhoodReducer from './neighborhoods_reducer';
import EvictionsReducer from './evictions_reducer';

const RootReducer = combineReducers({
  crime: CrimeReducer,
  evictions: EvictionsReducer,
  neighborhoods: NeighborhoodReducer
});

export default RootReducer;
