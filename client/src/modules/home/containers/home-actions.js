import { createAction } from 'redux-actions';
import {
  createOptimisticBeginAction,
  createOptimisticCommitAction,
  createOptimisticRevertAction,
} from '../../utils/redux';
import {
  GET_MACHINES_REQUEST,
  ADD_MACHINE_REQUEST,
  EDIT_MACHINE_REQUEST,
  GET_MACHINES_SUCCESS,
  GET_MACHINES_FAILURE,
  ADD_MACHINE_SUCCESS,
  ADD_MACHINE_FAILURE,
  EDIT_MACHINE_SUCCESS,
  EDIT_MACHINE_FAILURE,
  SELECT_MACHINE,
} from './constants';

export const getMachinesRequest = createAction(GET_MACHINES_REQUEST);
export const getMachinesSuccess = createAction(GET_MACHINES_SUCCESS);
export const getMachinesFailure = createAction(GET_MACHINES_FAILURE);

export const addMachineRequest = createOptimisticBeginAction(ADD_MACHINE_REQUEST);
export const addMachineSuccess = createOptimisticCommitAction(ADD_MACHINE_SUCCESS, ADD_MACHINE_REQUEST);
export const addMachineFailure = createOptimisticRevertAction(ADD_MACHINE_FAILURE, ADD_MACHINE_REQUEST);

export const editMachineRequest = createOptimisticBeginAction(EDIT_MACHINE_REQUEST);
export const editMachineSuccess = createOptimisticCommitAction(EDIT_MACHINE_SUCCESS, EDIT_MACHINE_REQUEST);
export const editMachineFailure = createOptimisticRevertAction(EDIT_MACHINE_FAILURE, EDIT_MACHINE_REQUEST);

export const selectMachine = createAction(SELECT_MACHINE);
