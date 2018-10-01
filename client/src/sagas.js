import { all } from 'redux-saga/effects';
import loggerSagas from './modules/logging/containers/logging-sagas';
import userSagas from './modules/user/containers/user-sagas';
import settingsSagas from './modules/settings/containers/settings-sagas';
import appSagas from './modules/app/containers/app-sagas';
import moSagas from './modules/mo/containers/mo-sagas';

export default function* root() {
  yield all([
    ...appSagas,
    ...loggerSagas,
    ...userSagas,
    ...settingsSagas,
    ...moSagas,
  ]);
}
