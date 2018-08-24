import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as configActions from './constants';

export const loaded = handleActions(
  {
    [configActions.GET_CONFIG_DATA_REQUEST]: () => false,
    [configActions.GET_CONFIG_DATA_SUCCESS]: () => true,
    [configActions.GET_CONFIG_FAIL]: () => false,
  },
  false,
);

export const loading = handleActions(
  {
    [configActions.GET_CONFIG_DATA_REQUEST]: () => true,
    [configActions.GET_CONFIG_DATA_SUCCESS]: () => false,
    [configActions.GET_CONFIG_FAIL]: () => false,
  },
  false,
);

export default combineReducers({
  loaded,
  loading,
});
