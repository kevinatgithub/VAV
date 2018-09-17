import {
  SAVE_SETTINGS_REQUEST,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
  GET_BODY_TYPES_REQUEST,
  GET_BODY_TYPES_SUCCESS,
  GET_BODY_TYPES_FAIL,
} from './settings-action-types';
import { createAsyncActions } from '../../utils/redux-async-actions';

export const { saveSettingsRequest, saveSettingsSuccess, saveSettingsFail } = createAsyncActions(
  SAVE_SETTINGS_REQUEST,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
);

export const { getBodyTypesRequest, getBodyTypesSuccess, getBodyTypesFail } = createAsyncActions(
  GET_BODY_TYPES_REQUEST,
  GET_BODY_TYPES_SUCCESS,
  GET_BODY_TYPES_FAIL,
);

