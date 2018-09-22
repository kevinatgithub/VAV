import { createAction } from 'redux-actions';
import {
  SAVE_BODY_TYPE_REQUEST,
  SAVE_BODY_TYPE_SUCCESS,
  SAVE_BODY_TYPE_FAIL,
  GET_BODY_TYPES_REQUEST,
  GET_BODY_TYPES_SUCCESS,
  GET_BODY_TYPES_FAIL,
  SELECT_BODY_TYPE,
} from './settings-action-types';
import { createAsyncActions } from '../../utils/redux-async-actions';

export const { saveBodyTypeRequest, saveBodyTypeSuccess, saveBodyTypeFail } = createAsyncActions(
  SAVE_BODY_TYPE_REQUEST,
  SAVE_BODY_TYPE_SUCCESS,
  SAVE_BODY_TYPE_FAIL,
);

export const { getBodyTypesRequest, getBodyTypesSuccess, getBodyTypesFail } = createAsyncActions(
  GET_BODY_TYPES_REQUEST,
  GET_BODY_TYPES_SUCCESS,
  GET_BODY_TYPES_FAIL,
);

export const selectBodyType = createAction(SELECT_BODY_TYPE);

