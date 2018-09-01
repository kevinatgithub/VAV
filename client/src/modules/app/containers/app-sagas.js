import { call, takeLatest } from 'redux-saga/effects';
import { Intent } from '@blueprintjs/core';
import { SHOW_TOAST } from './app-action-types';
import toaster from '../../utils/toaster';

function* showToast({ payload }) {
  const { intent, message } = payload;
  const icon = {
    [Intent.PRIMARY]: 'info-sign',
    [Intent.SUCCESS]: 'tick-circle',
    [Intent.DANGER]: 'error',
    [Intent.WARNING]: 'warning-sign',
    [Intent.WARNING]: 'warning-sign',
  }[intent];

  yield call([toaster, 'dismiss']);

  yield call([toaster, 'show'], {
    intent,
    icon,
    message,
    timeout: 4000,
  });
}

export default [takeLatest(SHOW_TOAST, showToast)];
