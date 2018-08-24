import { call, put, takeLatest } from 'redux-saga/effects';
import callApi from 'utils/api';
import localStorageManager from 'utils/localStorageManager';
import { getConfigDataSuccess, getConfigDataFail } from './config-actions';
import * as configActions from './constants';

/**
 * Fetch config settings from mw
 */
export function* getConfigData() {
  try {
    const avrConfig = yield call(localStorageManager.getItem, STORAGE_NAME);

    if (avrConfig) {
      yield put(getConfigDataSuccess(avrConfig));
    } else {
      let response = yield call(callApi, { endpoint: 'config.json' });
      response = { ...response, redirectUri: `${window.location.origin}` };
      yield put(getConfigDataSuccess(response));

      yield call(localStorageManager.setItem, STORAGE_NAME, response);
    }
  } catch (err) {
    yield put(getConfigDataFail(err.message));
  }
}

export default [takeLatest(configActions.GET_CONFIG_DATA_REQUEST, getConfigData)];
