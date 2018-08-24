import { call, put, takeLatest } from 'redux-saga/effects';
import callApi from 'utils/api';
import { getUserSuccess, getUserFailure } from './user-actions';
import { GET_USER_REQUEST } from './constants';
import { cacheSelectedConnectContext } from '../../utils/connect-context';

export function* getUser() {
  try {
    const response = yield call(callApi, { endpoint: 'user' });

    const [defaultConnectContext] = response.context || [];

    yield call(cacheSelectedConnectContext, defaultConnectContext);

    yield put(getUserSuccess(response));
  } catch (err) {
    yield put(getUserFailure(err.message));
  }
}

export default [
  takeLatest([GET_USER_REQUEST], getUser),
];
