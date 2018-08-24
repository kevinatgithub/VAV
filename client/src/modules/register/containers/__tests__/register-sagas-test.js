import { call, put } from 'redux-saga/effects';
import { notification } from 'antd';
import { registerUser } from '../register-sagas';
import callApi from '../../../utils/api';
import { registerUserSuccess, registerUserFailure } from '../register-actions';
import { logException } from '../../../logging/containers/logging-actions';
import { logLevels } from '../../../utils/values';

jest.mock('antd');

describe('register-saga', () => {
  const mockUser = {
    id: '7d1fd97c-7492-4295-96f5-c277fb5dc75c',
    username: 'benny@ad.csp.dlwnet.com ',
    name: 'Benny Smedts',
    context: ['customer1'],
  };

  it('handles registerUser', () => {
    const action = { payload: mockUser };
    const generator = registerUser(action);
    // eslint-disable-next-line
    const notDefined = undefined;
    expect(generator.next().value).toEqual(
      call(callApi, { endpoint: 'register', method: 'POST', body: JSON.stringify(action.payload) }),
    );

    const response = mockUser;
    expect(generator.next(response).value).toEqual(put(registerUserSuccess(response)));

    expect(generator.next(response).value).toEqual(
      call(notification.success, {
        message: notDefined,
        description: notDefined,
      }),
    );

    const err = { message: 'error' };
    expect(generator.throw(err).value).toEqual(put(registerUserFailure(err.message)));

    expect(generator.next(err).value).toEqual(
      put(
        logException({
          err,
          msg: 'could not register user',
          severityLevel: logLevels.ERROR,
        }),
      ),
    );

    expect(generator.next(err).value).toEqual(
      call(notification.error, {
        message: notDefined,
        description: notDefined,
      }),
    );
  });
});
