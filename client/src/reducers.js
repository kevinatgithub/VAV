import settingsReducers from './modules/settings/containers/settings-reducers';
import sideDialogReducers from './modules/common/side-dialog/containers/side-dialog-reducers';

const rootReducer = {
  settings: settingsReducers,
  sideDialog: sideDialogReducers,
};

export default rootReducer;
