import { combineActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { handleActionsWithReset } from '../../utils/redux-actions';
import {
  GET_MOS_SUCCESS,
  GET_MO_DETAILS_SUCCESS,
  GET_MO_DETAILS_REQUEST,
  FILTER_BY_STATUS,
  UNSELECT_MACHINE,
  SEARCH_MO,
  MO_RESET,
} from './mo-action-types';

export const mos = handleActionsWithReset(
  {
    [GET_MOS_SUCCESS]: (_, { payload }) => payload,
    [combineActions(FILTER_BY_STATUS, SEARCH_MO)]: () => ({ page: 1, totalPages: 1, result: [] }),
  },
  null,
  MO_RESET,
);

export const selectedMo = handleActionsWithReset(
  {
    [combineActions(GET_MO_DETAILS_REQUEST, UNSELECT_MACHINE)]: () => null,
    [GET_MO_DETAILS_SUCCESS]: (_, { payload }) => payload,
  },
  null,
  MO_RESET,
);

export default combineReducers({
  mos,
  selectedMo,
});
