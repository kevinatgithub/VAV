import { SAVE_SETTINGS_REQUEST, SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_FAIL } from './settings-action-types';
import { createAsyncActions } from '../../utils/redux-async-actions';

export const { saveSettingsRequest, saveSettingsSuccess, saveSettingsFail } = createAsyncActions(
  SAVE_SETTINGS_REQUEST,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
);

