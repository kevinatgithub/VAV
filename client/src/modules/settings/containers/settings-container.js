import { connect } from 'react-redux';
import Settings from '../components/settings';
import { saveBodyTypeRequest, deleteBodyTypeRequest, getBodyTypesRequest, selectBodyType } from './settings-actions';
import { showSideDialog } from '../../common/side-dialog/containers/side-dialog-actions';

const mapStateToProps = ({ settings }) => ({
  isSavingBodyType: settings.isSavingBodyType,
  bodyTypes: settings.bodyTypes,
  selectedBodyType: settings.selectedBodyType,
});

const mapDispatchToProps = {
  saveBodyTypeRequest,
  deleteBodyTypeRequest,
  getBodyTypesRequest,
  showSideDialog,
  selectBodyType,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
