import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { SHOW_APP_LOADING, HIDE_APP_LOADING } from './app-action-types';

export const appLoading = handleActions({
  [SHOW_APP_LOADING]: () => true,
  [HIDE_APP_LOADING]: () => false,
}, false);


export default combineReducers({
  appLoading,
});
