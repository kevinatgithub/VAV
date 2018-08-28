import { createAsyncActionTypes } from '../../utils/redux-async-actions';

export const {
  SAVE_SETTINGS_REQUEST,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
} = createAsyncActionTypes('SAVE_SETTINGS');
