import { all } from 'redux-saga/effects';
import configSagas from './modules/config/containers/config-sagas';
import loggerSagas from './modules/logging/containers/logging-sagas';
import homeSagas from './modules/home/containers/home-sagas';
import registerSagas from './modules/register/containers/register-sagas';
import userSagas from './modules/user/containers/user-sagas';

export default function* root() {
  yield all([
    ...configSagas,
    ...loggerSagas,
    ...homeSagas,
    ...userSagas,
    ...registerSagas,
  ]);
}
