import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Intent } from '@blueprintjs/core';
import { saveSettingsSuccess, saveSettingsFail, getBodyTypesSuccess, getBodyTypesFail } from './settings-actions';
import { SAVE_SETTINGS_REQUEST, GET_BODY_TYPES_REQUEST } from './settings-action-types';
import { showAppLoading, hideAppLoading, showToast } from '../../app/containers/app-actions';

function* getBodyTypes() {
  try {
    yield put(showAppLoading());

    yield call(delay, 3000);

    const result = [
      { id: 1, name: 'MPV', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C1' },
      { id: 2, name: 'DROPSIDE', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C2' },
      { id: 3, name: 'ALUMINUM VAN', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C3' },
      { id: 4, name: 'DUMP TRUCK', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C4' },
      { id: 5, name: 'GARBAGE DUMP TRUCK', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C5' },
      { id: 6, name: '3 WAY DUMP TRUCK', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C6' },
      { id: 7, name: 'WING VAN', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C7' },
      { id: 8, name: 'MIXER', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C8' },
      { id: 9, name: 'BUS', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C9' },
      { id: 10, name: 'ECO PUV', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C10' },
      { id: 11, name: 'MICROBUS', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C11' },
      { id: 12, name: 'COASTERS', dateCreated: '02/12/2018', createdBy: 'Ima Languayan', code: 'C12' },
    ];

    yield put(getBodyTypesSuccess(result));
  } catch (error) {
    yield put(getBodyTypesFail(error));
  } finally {
    yield put(hideAppLoading());
  }
}

function* saveSettings({ payload }) {
  try {
    yield call(delay, 3000);

    const result = yield payload;

    yield put(saveSettingsSuccess(result));

    yield put(
      showToast({
        intent: Intent.SUCCESS,
        message: 'Settings has been updated.',
      }),
    );
  } catch (error) {
    yield put(saveSettingsFail(error));
  }
}

export default [
  takeLatest(SAVE_SETTINGS_REQUEST, saveSettings),
  takeLatest(GET_BODY_TYPES_REQUEST, getBodyTypes),
];
