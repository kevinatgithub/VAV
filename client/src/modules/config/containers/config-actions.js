import { createAction } from 'redux-actions';
import * as actionTypes from './constants';

export const getConfigDataRequest = createAction(actionTypes.GET_CONFIG_DATA_REQUEST);
export const getConfigDataSuccess = createAction(actionTypes.GET_CONFIG_DATA_SUCCESS);
export const getConfigDataFail = createAction(actionTypes.GET_CONFIG_DATA_FAIL);
