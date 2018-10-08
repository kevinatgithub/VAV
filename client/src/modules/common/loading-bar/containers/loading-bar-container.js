import { connect } from 'react-redux';
import LoadingBar from '../components/loading-bar';

const mapStateToProps = ({ app }) => ({
  visible: app.loading,
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(LoadingBar);
