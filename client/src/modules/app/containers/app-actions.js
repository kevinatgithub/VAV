import { createAction } from 'redux-actions';
import { SHOW_APP_LOADING, HIDE_APP_LOADING } from './app-action-types';

export const showAppLoading = createAction(SHOW_APP_LOADING);
export const hideAppLoading = createAction(HIDE_APP_LOADING);
