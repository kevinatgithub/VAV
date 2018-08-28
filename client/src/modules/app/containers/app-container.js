import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import App from '../components/app';

const mapDispatchToProps = {};

// WARNING! Avoid binding state to app to avoid unnecessary rerender
export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(App);

