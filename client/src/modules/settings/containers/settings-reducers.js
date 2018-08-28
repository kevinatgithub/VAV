import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { SAVE_SETTINGS_REQUEST, SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_FAIL } from './settings-action-types';

export const isSaving = handleActions(
  {
    [SAVE_SETTINGS_REQUEST]: () => true,
    [SAVE_SETTINGS_SUCCESS]: () => false,
    [SAVE_SETTINGS_FAIL]: () => false,
  },
  false,
);

export default combineReducers({
  isSaving,
});
