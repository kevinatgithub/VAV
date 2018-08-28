import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Intent } from '@blueprintjs/core';
import { saveSettingsSuccess, saveSettingsFail } from './settings-actions';
import { SAVE_SETTINGS_REQUEST } from './settings-action-types';
import { showAppLoading, hideAppLoading } from '../../app/containers/app-actions';
import toaster from '../../utils/toaster';

function* saveSettings({ payload }) {
  try {
    yield put(showAppLoading());

    yield call(delay, 3000);

    const result = yield payload;

    yield put(saveSettingsSuccess(result));

    yield put(hideAppLoading());

    yield call([toaster, 'show'], {
      intent: Intent.SUCCESS,
      icon: 'tick-circle',
      message: 'Settings has been updated.',
    });
  } catch (error) {
    yield put(saveSettingsFail(error));

    yield put(hideAppLoading());
  }
}

export default [takeLatest(SAVE_SETTINGS_REQUEST, saveSettings)];
