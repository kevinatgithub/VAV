import { connect } from 'react-redux';
import SideDialog from '../components/side-dialog';
import { showSideDialog } from './side-dialog-actions';

const mapStateToProps = ({ sideDialog }) => ({
  isSideDialogOpen: sideDialog.isSideDialogOpen,
});

const mapActionsToProps = {
  showSideDialog,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(SideDialog);
