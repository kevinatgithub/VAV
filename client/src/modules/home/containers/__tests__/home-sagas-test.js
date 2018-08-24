import { call, put } from 'redux-saga/effects';
import { notification } from 'antd';
import { getMachines, saveMachine } from '../home-sagas';
import callApi from '../../../utils/api';
import {
  getMachinesSuccess,
  getMachinesFailure,
  addMachineRequest,
  addMachineSuccess,
  addMachineFailure,
  editMachineRequest,
  editMachineSuccess,
} from '../home-actions';

jest.mock('antd');

describe('home-saga', () => {
  const dummyMachine = {
    displayName: 'Machine 1',
    serialNumber: 'L212121',
  };

  it('handles getMachines', () => {
    const generator = getMachines();

    expect(generator.next().value).toEqual(call(callApi, { endpoint: 'device' }));

    const response = dummyMachine;
    expect(generator.next(response).value).toEqual(put(getMachinesSuccess(response)));

    const err = { message: 'error' };
    expect(generator.throw(err).value).toEqual(put(getMachinesFailure(err.message)));
  });

  it('handles saveMachine add mode', () => {
    const payload = dummyMachine;
    const action = addMachineRequest(payload);
    const generator = saveMachine(action);
    // eslint-disable-next-line
    const notDefined = undefined;

    expect(generator.next(action).value).toEqual(
      call(callApi, {
        endpoint: 'device',
        method: 'post',
        body: JSON.stringify(payload),
      }),
    );

    const response = { data: payload };
    expect(generator.next(response).value).toEqual(put(addMachineSuccess(response.data)));

    expect(generator.next().value).toEqual(
      call(notification.success, {
        message: notDefined,
        description: notDefined,
      }),
    );

    const err = { message: 'error' };
    expect(generator.throw(err).value).toEqual(put(addMachineFailure(err.message)));

    expect(generator.next().value).toEqual(
      call(notification.error, {
        message: notDefined,
        description: notDefined,
      }),
    );
  });

  it('handles saveMachine edit mode', () => {
    const payload = dummyMachine;
    const action = editMachineRequest(payload);
    const generator = saveMachine(action);
    // eslint-disable-next-line
    const notDefined = undefined;

    expect(generator.next(action).value).toEqual(
      call(callApi, {
        endpoint: 'device',
        method: 'put',
        body: JSON.stringify(payload),
      }),
    );

    const response = { data: payload };
    expect(generator.next(response).value).toEqual(put(editMachineSuccess(response.data)));

    expect(generator.next().value).toEqual(
      call(notification.success, {
        message: notDefined,
        description: notDefined,
      }),
    );

    // no need to test code in catch block since it has already been tested on add mode
  });
});
