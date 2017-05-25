import { connect } from 'react-redux';
import { requestCrimes } from '../../actions/crime_actions';
import DataMap from './map';

const mapStateToProps = ({ crime }) => ({
  crimes: crime
});

const mapDispatchToProps = dispatch => ({
  requestCrimes: () => dispatch(requestCrimes())
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMap);
