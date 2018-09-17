import { createAsyncActionTypes } from 'utils/redux-async-actions';

export const {
  SAVE_SETTINGS_REQUEST,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
} = createAsyncActionTypes('SAVE_SETTINGS');

export const {
  GET_BODY_TYPES_REQUEST,
  GET_BODY_TYPES_SUCCESS,
  GET_BODY_TYPES_FAIL,
} = createAsyncActionTypes('GET_BODY_TYPES');

