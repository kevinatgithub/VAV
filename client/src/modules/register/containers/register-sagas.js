import { call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import i18next from 'i18next';
import callApi from 'utils/api';
import * as actionTypes from './constants';
import { logException } from '../../logging/containers/logging-actions';
import { registerUserSuccess, registerUserFailure } from './register-actions';
import { logLevels } from '../../utils/values';

export function* registerUser({ payload }) {
  try {
    const response = yield call(callApi, { endpoint: 'register', method: 'POST', body: JSON.stringify(payload) });
    yield put(registerUserSuccess(response));
    yield call(notification.success, {
      message: i18next.t('shared.successNotificationTitle'),
      description: i18next.t('register.successMessage'),
    });
  } catch (err) {
    yield put(registerUserFailure(err.message));
    yield put(
      logException({
        err,
        msg: 'could not register user',
        severityLevel: logLevels.ERROR,
      }),
    );
    yield call(notification.error, {
      message: i18next.t('shared.errorNotificationTitle'),
      description: i18next.t('register.errorMessage'),
    });
  }
}

export default [takeLatest(actionTypes.REGISTER_USER_REQUEST, registerUser)];
