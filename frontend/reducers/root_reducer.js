import { combineReducers } from 'redux';
import CrimeReducer from './crime_reducer';

const RootReducer = combineReducers({
  crime: CrimeReducer
});

export default RootReducer;
