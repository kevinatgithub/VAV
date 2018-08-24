import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getConfigDataRequest } from '../../config/containers/config-actions';
import App from '../components/app';

const mapStateToProps = state => ({
  configLoaded: state.config.loaded,
  configLoading: state.config.loading,
});

const mapDispatchToProps = {
  getConfigDataRequest,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
