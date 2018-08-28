import { combineReducers } from 'redux';
import userReducers from './modules/user/containers/user-reducers';
import appReducers from './modules/app/containers/app-reducers';
import settingsReducers from './modules/settings/containers/settings-reducers';

const rootReducer = combineReducers({
  user: userReducers,
  app: appReducers,
  settings: settingsReducers,
});

export default rootReducer;
