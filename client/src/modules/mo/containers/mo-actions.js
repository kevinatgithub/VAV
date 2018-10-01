import { createAction } from 'redux-actions';
import { createAsyncActions } from 'utils/redux-actions';
import {
  GET_MOS_REQUEST,
  GET_MOS_SUCCESS,
  GET_MOS_FAIL,
  GET_MO_DETAILS_SUCCESS,
  GET_MO_DETAILS_FAIL,
  GET_MO_DETAILS_REQUEST,
  FILTER_BY_STATUS,
  UNSELECT_MACHINE,
} from './mo-action-types';

export const { getMosRequest, getMosSuccess, getMosFail } = createAsyncActions(
  GET_MOS_REQUEST,
  GET_MOS_SUCCESS,
  GET_MOS_FAIL,
);

export const { getMoDetailsRequest, getMoDetailsSuccess, getMoDetailsFail } = createAsyncActions(
  GET_MO_DETAILS_REQUEST,
  GET_MO_DETAILS_SUCCESS,
  GET_MO_DETAILS_FAIL,
);

export const filterByStatus = createAction(FILTER_BY_STATUS);

export const unselectMachine = createAction(UNSELECT_MACHINE);

