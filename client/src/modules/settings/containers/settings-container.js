import { connect } from 'react-redux';
import Settings from '../components/settings';
import { saveSettingsRequest } from './settings-actions';

const mapStateToProps = ({ settings }) => ({
  isSaving: settings.isSaving,
});

const mapDispatchToProps = {
  saveSettingsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
