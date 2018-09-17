import { connect } from 'react-redux';
import Settings from '../components/settings';
import { saveSettingsRequest, getBodyTypesRequest } from './settings-actions';
import { showSideDialog } from '../../common/side-dialog/containers/side-dialog-actions';

const mapStateToProps = ({ settings }) => ({
  isSaving: settings.isSaving,
  bodyTypes: settings.bodyTypes,
});

const mapDispatchToProps = {
  saveSettingsRequest,
  getBodyTypesRequest,
  showSideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
