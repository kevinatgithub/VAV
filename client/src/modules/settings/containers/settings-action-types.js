import { createAsyncActionTypes } from 'core/utils/redux-actions';

export const {
  SAVE_BODY_TYPE_REQUEST,
  SAVE_BODY_TYPE_SUCCESS,
  SAVE_BODY_TYPE_FAIL,
} = createAsyncActionTypes('SAVE_BODY_TYPE');

export const {
  DELETE_BODY_TYPE_REQUEST,
  DELETE_BODY_TYPE_SUCCESS,
  DELETE_BODY_TYPE_FAIL,
} = createAsyncActionTypes('DELETE_BODY_TYPE');

export const {
  GET_BODY_TYPES_REQUEST,
  GET_BODY_TYPES_SUCCESS,
  GET_BODY_TYPES_FAIL,
} = createAsyncActionTypes('GET_BODY_TYPES');

export const SELECT_BODY_TYPE = 'SELECT_BODY_TYPE';

