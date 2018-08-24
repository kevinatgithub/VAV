import { combineReducers } from 'redux';
import homeReducer from './modules/home/containers/home-reducers';
import configReducer from './modules/config/containers/config-reducer';
import registerReducer from './modules/register/containers/register-reducers';
import userReducers from './modules/user/containers/user-reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  config: configReducer,
  register: registerReducer,
  user: userReducers,
});

export default rootReducer;
