import { connect } from 'react-redux';
import { requestCrimes } from '../../actions/crime_actions';
import { requestNeighborhoods } from '../../actions/neighborhoods_actions';
import { requestEvictions } from '../../actions/evictions_actions';
import DataMap from './map';

const mapStateToProps = ({ crime, neighborhoods, evictions }) => ({
  crimes: crime,
  neighborhoods,
  evictions
});

const mapDispatchToProps = dispatch => ({
  requestCrimes: () => dispatch(requestCrimes()),
  requestNeighborhoodLines: () => dispatch(requestNeighborhoods()),
  requestEvictions: () => dispatch(requestEvictions())
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMap);
