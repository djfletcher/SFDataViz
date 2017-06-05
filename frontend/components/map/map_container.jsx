import { connect } from 'react-redux';
import { requestCrimes } from '../../actions/crime_actions';
import { requestNeighborhoods } from '../../actions/neighborhoods_actions';
import DataMap from './map';

const mapStateToProps = ({ crime, neighborhoods }) => ({
  crimes: crime,
  neighborhoods
});

const mapDispatchToProps = dispatch => ({
  requestCrimes: () => dispatch(requestCrimes()),
  requestNeighborhoods: () => dispatch(requestNeighborhoods())
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMap);
