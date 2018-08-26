import { combineReducers } from 'redux';
import userReducers from './modules/user/containers/user-reducers';

const rootReducer = combineReducers({
  user: userReducers,
});

export default rootReducer;
