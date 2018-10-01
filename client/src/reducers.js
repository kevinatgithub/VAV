import { combineReducers } from 'redux';
import userReducers from './modules/user/containers/user-reducers';
import appReducers from './modules/app/containers/app-reducers';
import settingsReducers from './modules/settings/containers/settings-reducers';
import sideDialogReducers from './modules/common/side-dialog/containers/side-dialog-reducers';
import moReducers from './modules/mo/containers/mo-reducers';

const rootReducer = combineReducers({
  user: userReducers,
  app: appReducers,
  settings: settingsReducers,
  sideDialog: sideDialogReducers,
  mo: moReducers,
});

export default rootReducer;
