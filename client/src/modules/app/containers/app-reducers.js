import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { SHOW_APP_LOADING } from './app-action-types';

export const appLoading = handleActions({
  [SHOW_APP_LOADING]: (_, { payload }) => payload,
}, false);


export default combineReducers({
  appLoading,
});
