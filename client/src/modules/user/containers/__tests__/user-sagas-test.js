import { call, put } from 'redux-saga/effects';
import { getUser } from '../user-sagas';
import callApi from '../../../utils/api';
import { getUserSuccess, getUserFailure } from '../user-actions';
import { cacheSelectedConnectContext } from '../../../utils/connect-context';

describe('user-sagas', () => {
  const mockUser = {
    id: '7d1fd97c-7492-4295-96f5-c277fb5dc75c',
    username: 'benny@ad.csp.dlwnet.com ',
    name: 'Benny Smedts',
    context: [
      'customer1',
    ],
  };

  it('handles getUser', () => {
    const generator = getUser();

    expect(generator.next().value).toEqual(
      call(callApi, { endpoint: 'user' }),
    );

    const response = mockUser;
    expect(generator.next(response).value).toEqual(
      call(cacheSelectedConnectContext, mockUser.context[0]),
    );
    expect(generator.next(response).value).toEqual(
      put(getUserSuccess(response)),
    );

    const err = { message: 'error' };
    expect(generator.throw(err).value).toEqual(
      put(getUserFailure(err.message)),
    );
  });
});
