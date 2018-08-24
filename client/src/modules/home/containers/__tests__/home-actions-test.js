import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui';
import {
  getMachinesRequest,
  getMachinesSuccess,
  getMachinesFailure,
  selectMachine,
  addMachineRequest,
  addMachineSuccess,
  addMachineFailure,
  editMachineSuccess,
  editMachineRequest,
  editMachineFailure,
} from '../home-actions';
import {
  GET_MACHINES_REQUEST,
  GET_MACHINES_SUCCESS,
  GET_MACHINES_FAILURE,
  SELECT_MACHINE,
  ADD_MACHINE_REQUEST,
  ADD_MACHINE_SUCCESS,
  ADD_MACHINE_FAILURE,
  EDIT_MACHINE_REQUEST,
  EDIT_MACHINE_SUCCESS,
  EDIT_MACHINE_FAILURE,
} from '../constants';

describe('home-actions', () => {
  it('getMachinesRequest action', () => {
    const expectedAction = {
      type: GET_MACHINES_REQUEST,
    };
    expect(getMachinesRequest()).toEqual(expectedAction);
  });
  it('getMachinesSuccess action', () => {
    const expectedAction = {
      type: GET_MACHINES_SUCCESS,
    };
    expect(getMachinesSuccess()).toEqual(expectedAction);
  });
  it('getMachinesFailure action', () => {
    const expectedAction = {
      type: GET_MACHINES_FAILURE,
    };
    expect(getMachinesFailure()).toEqual(expectedAction);
  });
  it('selectMachine action', () => {
    const payload = {
      displayName: 'Machine 1',
      serialNumber: 'L212121',
    };
    const expectedAction = {
      type: SELECT_MACHINE,
      payload,
    };
    expect(selectMachine(payload)).toEqual(expectedAction);
  });

  it('addMachineRequest action', () => {
    const expectedAction = {
      type: ADD_MACHINE_REQUEST,
      meta: {
        optimistic: { transactionID: ADD_MACHINE_REQUEST, type: BEGIN },
      },
    };
    expect(addMachineRequest()).toEqual(expectedAction);
  });
  it('addMachineSuccess action', () => {
    const expectedAction = {
      type: ADD_MACHINE_SUCCESS,
      meta: {
        optimistic: { transactionID: ADD_MACHINE_REQUEST, type: COMMIT },
      },
    };
    expect(addMachineSuccess()).toEqual(expectedAction);
  });
  it('addMachineFailure action', () => {
    const expectedAction = {
      type: ADD_MACHINE_FAILURE,
      meta: {
        optimistic: { transactionID: ADD_MACHINE_REQUEST, type: REVERT },
      },
    };
    expect(addMachineFailure()).toEqual(expectedAction);
  });

  it('editMachineRequest action', () => {
    const expectedAction = {
      type: EDIT_MACHINE_REQUEST,
      meta: {
        optimistic: { transactionID: EDIT_MACHINE_REQUEST, type: BEGIN },
      },
    };
    expect(editMachineRequest()).toEqual(expectedAction);
  });
  it('editMachineSuccess action', () => {
    const expectedAction = {
      type: EDIT_MACHINE_SUCCESS,
      meta: {
        optimistic: { transactionID: EDIT_MACHINE_REQUEST, type: COMMIT },
      },
    };
    expect(editMachineSuccess()).toEqual(expectedAction);
  });
  it('editMachineFailure action', () => {
    const expectedAction = {
      type: EDIT_MACHINE_FAILURE,
      meta: {
        optimistic: { transactionID: EDIT_MACHINE_REQUEST, type: REVERT },
      },
    };
    expect(editMachineFailure()).toEqual(expectedAction);
  });
});
