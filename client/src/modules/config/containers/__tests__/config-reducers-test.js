import { loaded, loading } from '../config-reducer';
import { getConfigDataRequest, getConfigDataSuccess, getConfigDataFail } from '../config-actions';

describe('config-reducers', () => {
  it('handle getting config data loading', () => {
    expect(loading(false, getConfigDataRequest())).toEqual(true);
    expect(loaded(false, getConfigDataRequest())).toEqual(false);
  });

  const configData = {
    instrumentationKey: '123',
    clientId: 12724,
  };

  it('handle getting config data success', () => {
    expect(loading(false, getConfigDataSuccess(configData))).toEqual(false);
    expect(loaded(false, getConfigDataSuccess(configData))).toEqual(true);
  });

  it('handle getting config data fail', () => {
    expect(loading(false, getConfigDataFail())).toEqual(false);
    expect(loaded(false, getConfigDataFail())).toEqual(false);
  });
});
