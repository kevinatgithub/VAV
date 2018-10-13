import { connect } from 'react-redux';
import Settings from '../components/settings';
import { saveBodyTypeRequest, deleteBodyTypeRequest, getBodyTypesRequest, selectBodyType } from './settings-actions';

const mapStateToProps = ({ settings }) => ({
  isSavingBodyType: settings.isSavingBodyType,
  bodyTypes: settings.bodyTypes,
  selectedBodyType: settings.selectedBodyType,
});

const mapDispatchToProps = {
  saveBodyTypeRequest,
  deleteBodyTypeRequest,
  getBodyTypesRequest,
  showSideDialog: () => true,
  selectBodyType,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
