import { call, put, takeLatest } from 'redux-saga/effects';
import callApi from 'utils/api';
import {
  getMachinesSuccess,
  getMachinesFailure,
  addMachineSuccess,
  editMachineSuccess,
  addMachineFailure,
  editMachineFailure,
} from './home-actions';
import { GET_MACHINES_REQUEST, ADD_MACHINE_REQUEST, EDIT_MACHINE_REQUEST } from './constants';
import { logException } from '../../logging/containers/logging-actions';
import { logLevels } from '../../utils/values';

export function* getMachines() {
  try {
    const response = yield call(callApi, { endpoint: 'device' });
    yield put(getMachinesSuccess(response));
  } catch (err) {
    yield put(getMachinesFailure(err.message));
    yield put(logException({ err, msg: 'could not get list machines', severityLevel: logLevels.ERROR }));
  }
}

export function* saveMachine({ type, payload }) {
  const actionSuccess = type === EDIT_MACHINE_REQUEST ? editMachineSuccess : addMachineSuccess;
  const actionFailure = type === EDIT_MACHINE_REQUEST ? editMachineFailure : addMachineFailure;
  const httpMethod = type === EDIT_MACHINE_REQUEST ? 'put' : 'post';

  try {
    const response = yield call(callApi, {
      endpoint: 'device',
      method: httpMethod,
      body: JSON.stringify(payload),
    });
    yield put(actionSuccess(response.data));
  } catch (err) {
    yield put(actionFailure(err.message));

    yield put(logException({ err, msg: 'could not save machine', severityLevel: logLevels.ERROR }));
  }
}

export default [
  takeLatest(GET_MACHINES_REQUEST, getMachines),
  takeLatest([ADD_MACHINE_REQUEST, EDIT_MACHINE_REQUEST], saveMachine),
];
