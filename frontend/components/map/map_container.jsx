import { connect } from 'react-redux';
import { requestCrimes } from '../../actions/crime_actions';
import { requestNeighborhoods } from '../../actions/neighborhoods_actions';
import { requestIntersections } from '../../actions/intersections_actions';
import DataMap from './map';

const mapStateToProps = ({ crime, neighborhoods, intersections }) => ({
  crimes: crime,
  neighborhoods,
  intersections
});

const mapDispatchToProps = dispatch => ({
  requestCrimes: () => dispatch(requestCrimes()),
  requestNeighborhoods: () => dispatch(requestNeighborhoods()),
  requestIntersections: () => dispatch(requestIntersections())
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMap);
