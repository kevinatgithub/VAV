import { handleActions, combineActions } from 'redux-actions';
import { optimistic } from 'redux-optimistic-ui';
import { combineReducers, compose } from 'redux';
import {
  GET_MACHINES_REQUEST,
  GET_MACHINES_SUCCESS,
  SELECT_MACHINE,
  EDIT_MACHINE_REQUEST,
  ADD_MACHINE_REQUEST,
} from './constants';

export const machines = handleActions(
  {
    [GET_MACHINES_REQUEST]: () => [],
    [GET_MACHINES_SUCCESS]: (_, { payload }) => payload,
    [ADD_MACHINE_REQUEST]: (state, { payload }) => [...state, payload],
    [EDIT_MACHINE_REQUEST]: (state, { payload }) => state && state.map((machine) => {
      if (machine.serialNumber === payload.serialNumber) {
        return { ...machine, ...payload };
      }
      return machine;
    }),
  },
  null,
);

export const selectedMachine = handleActions(
  {
    [combineActions(
      SELECT_MACHINE,
      EDIT_MACHINE_REQUEST,
    )]: (_, { payload }) => payload,
    [GET_MACHINES_SUCCESS]: (state, { payload }) => payload && payload.length ? payload[0] : state,
  },
  null,
);

export default compose(optimistic, combineReducers)({
  machines,
  selectedMachine,
});
