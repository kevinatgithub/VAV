import { createAction } from 'redux-actions';
import * as actionTypes from './constants';

export const logEvent = createAction(actionTypes.LOG_EVENT);
export const logEventSuccess = createAction(actionTypes.LOG_EVENT_SUCCESS);
export const logEventFailure = createAction(actionTypes.LOG_EVENT_FAILURE);

export const logException = createAction(actionTypes.LOG_EXCEPTION);
export const logExceptionSuccess = createAction(
  actionTypes.LOG_EXCEPTION_SUCCESS,
);
export const logExceptionFailure = createAction(
  actionTypes.LOG_EXCEPTION_FAILURE,
);

export const trackPageView = createAction(actionTypes.TRACK_PAGE_VIEW);
export const trackPageViewSuccess = createAction(
  actionTypes.TRACK_PAGE_VIEW_SUCCESS,
);
export const trackPageViewFail = createAction(actionTypes.TRACK_PAGE_VIEW_FAIL);

export const initLogging = createAction(actionTypes.INIT_LOGGING);
