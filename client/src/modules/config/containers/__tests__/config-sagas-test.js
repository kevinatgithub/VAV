import { call, put } from 'redux-saga/effects';
import { getConfigData } from '../config-sagas';
import callApi from '../../../utils/api';
import { getConfigDataSuccess, getConfigDataFail } from '../config-actions';
import localStorageManager from '../../../utils/localStorageManager';

jest.mock('../../../utils/localStorageManager');

global.STORAGE_NAME = 'avr-config-settings';

describe('config saga', () => {
  const dummyConfig = {
    instrumentationKey: '123',
    clientId: 123,
    redirectUri: 'null',
  };

  it('handles getConfigdata', () => {
    const generator = getConfigData();

    expect(generator.next().value).toEqual(call(localStorageManager.getItem, STORAGE_NAME));

    expect(generator.next(null).value).toEqual(call(callApi, { endpoint: 'config.json' }));

    const response = dummyConfig;
    expect(generator.next(response).value).toEqual(put(getConfigDataSuccess(response)));

    const err = { message: 'error' };
    expect(generator.throw(err).value).toEqual(put(getConfigDataFail(err.message)));
  });
});
