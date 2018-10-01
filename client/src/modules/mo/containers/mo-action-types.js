import { createAsyncActionTypes } from 'utils/redux-actions';

export const {
  GET_MOS_REQUEST,
  GET_MOS_SUCCESS,
  GET_MOS_FAIL,
} = createAsyncActionTypes('GET_MOS');

export const {
  GET_MO_DETAILS_REQUEST,
  GET_MO_DETAILS_SUCCESS,
  GET_MO_DETAILS_FAIL,
} = createAsyncActionTypes('GET_MO_DETAILS');

export const FILTER_BY_STATUS = 'FILTER_BY_STATUS';

export const SEARCH_MO = 'SEARCH_MO';

export const UNSELECT_MACHINE = 'UNSELECT_MACHINE';

