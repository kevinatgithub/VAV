import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  SAVE_BODY_TYPE_REQUEST,
  SAVE_BODY_TYPE_SUCCESS,
  SAVE_BODY_TYPE_FAIL,
  GET_BODY_TYPES_REQUEST,
  GET_BODY_TYPES_SUCCESS,
  SELECT_BODY_TYPE,
} from './settings-action-types';

export const isSavingBodyType = handleActions(
  {
    [SAVE_BODY_TYPE_REQUEST]: () => true,
    [SAVE_BODY_TYPE_SUCCESS]: () => false,
    [SAVE_BODY_TYPE_FAIL]: () => false,
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

export const selectedBodyType = handleActions(
  {
    [SELECT_BODY_TYPE]: (_, { payload }) => payload,
    [GET_BODY_TYPES_REQUEST]: () => null,
  },
  null,
);

export default combineReducers({
  isSavingBodyType,
  bodyTypes,
  selectedBodyType,
});
