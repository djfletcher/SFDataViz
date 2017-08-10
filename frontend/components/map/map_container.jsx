import { connect } from 'react-redux';
import { requestCrimes } from '../../actions/crime_actions';
import { requestNeighborhoods } from '../../actions/neighborhoods_actions';
import { requestIntersections } from '../../actions/intersections_actions';
import { requestRoadEdges } from '../../actions/road_edges_actions';
import DataMap from './map';

const mapStateToProps = ({ crime, neighborhoods, intersections, roadEdges }) => ({
  crimes: crime,
  neighborhoods,
  intersections,
  roadEdges
});

const mapDispatchToProps = dispatch => ({
  requestCrimes: () => dispatch(requestCrimes()),
  requestNeighborhoods: () => dispatch(requestNeighborhoods()),
  requestIntersections: () => dispatch(requestIntersections()),
  requestRoadEdges: () => dispatch(requestRoadEdges())
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMap);
