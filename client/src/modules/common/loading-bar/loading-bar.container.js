import { connect } from 'react-redux';
import LoadingBar from './loading-bar.component';

const mapStateToProps = ({ app }) => ({
  visible: app.loading,
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(LoadingBar);
