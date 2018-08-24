import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import App from '../components/app';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
