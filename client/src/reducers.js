import { combineReducers } from 'redux';
import homeReducer from './modules/home/containers/home-reducers';
import userReducers from './modules/user/containers/user-reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  user: userReducers,
});

export default rootReducer;
