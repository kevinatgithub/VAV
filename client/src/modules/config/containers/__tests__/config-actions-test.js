import { getConfigDataRequest, getConfigDataSuccess, getConfigDataFail } from '../config-actions';
import { GET_CONFIG_DATA_REQUEST, GET_CONFIG_DATA_SUCCESS, GET_CONFIG_DATA_FAIL } from '../constants';

describe('config-actions', () => {
  it('get config data action', () => {
    const expectedAction = {
      type: GET_CONFIG_DATA_REQUEST,
    };
    expect(getConfigDataRequest()).toEqual(expectedAction);
  });
  it('get config data success action', () => {
    const payload = {
      instrumentationKey: '12a3',
      clientId: 2134,
    };
    const expectedAction = {
      type: GET_CONFIG_DATA_SUCCESS,
      payload,
    };
    expect(getConfigDataSuccess(payload)).toEqual(expectedAction);
  });
  it('get config data fail action', () => {
    const expectedAction = {
      type: GET_CONFIG_DATA_FAIL,
    };
    expect(getConfigDataFail()).toEqual(expectedAction);
  });
});
