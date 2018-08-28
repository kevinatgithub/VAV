import { all } from 'redux-saga/effects';
import loggerSagas from './modules/logging/containers/logging-sagas';
import userSagas from './modules/user/containers/user-sagas';
import settingsSagas from './modules/settings/containers/settings-sagas';

export default function* root() {
  yield all([
    ...loggerSagas,
    ...userSagas,
    ...settingsSagas,
  ]);
}
