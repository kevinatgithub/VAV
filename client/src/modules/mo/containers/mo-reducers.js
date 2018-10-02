import { handleActions, combineActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  GET_MOS_SUCCESS,
  GET_MO_DETAILS_SUCCESS,
  GET_MO_DETAILS_REQUEST,
  FILTER_BY_STATUS,
  UNSELECT_MACHINE,
  SEARCH_MO,
} from './mo-action-types';

export const mos = handleActions(
  {
    [GET_MOS_SUCCESS]: (_, { payload }) => payload,
    [combineActions(FILTER_BY_STATUS, SEARCH_MO)]: () => ({ page: 1, totalPages: 1, result: [] }),
  },
  null,
);
export const selectedMo = handleActions(
  {
    [combineActions(GET_MO_DETAILS_REQUEST, UNSELECT_MACHINE)]: () => null,
    [GET_MO_DETAILS_SUCCESS]: (_, { payload }) => payload,
  },
  null,
);

export default combineReducers({
  mos,
  selectedMo,
});
