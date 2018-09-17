import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  SAVE_SETTINGS_REQUEST,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
  GET_BODY_TYPES_REQUEST,
  GET_BODY_TYPES_SUCCESS,
} from './settings-action-types';

export const isSaving = handleActions(
  {
    [SAVE_SETTINGS_REQUEST]: () => true,
    [SAVE_SETTINGS_SUCCESS]: () => false,
    [SAVE_SETTINGS_FAIL]: () => false,
  },
  false,
);

export const bodyTypes = handleActions(
  {
    [GET_BODY_TYPES_REQUEST]: () => null,
    [GET_BODY_TYPES_SUCCESS]: (_, { payload }) => payload,
  },
  null,
);

export default combineReducers({
  isSaving,
  bodyTypes,
});
