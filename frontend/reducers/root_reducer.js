import { combineReducers } from 'redux';
import CrimeReducer from './crime_reducer';
import NeighborhoodReducer from './neighborhoods_reducer';
import IntersectionsReducer from './intersections_reducer';
import RoadEdgesReducer from './road_edges_reducer';

const RootReducer = combineReducers({
  crime: CrimeReducer,
  neighborhoods: NeighborhoodReducer,
  intersections: IntersectionsReducer,
  roadEdges: RoadEdgesReducer
});

export default RootReducer;
