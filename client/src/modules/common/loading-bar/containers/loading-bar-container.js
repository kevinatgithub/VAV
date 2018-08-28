import { connect } from 'react-redux';
import LoadingBar from '../components/loading-bar';

const mapStateToProps = ({ app }) => ({
  visible: app.appLoading,
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(LoadingBar);
