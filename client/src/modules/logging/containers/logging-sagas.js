import {
  takeLatest,
  takeEvery,
  put,
} from 'redux-saga/effects';
import authentication from 'core/utils/auth.manager';
import { logLevels } from 'core/utils/values';
import {
  trackEventInsight,
  trackExceptionInsight,
  init,
  trackPageViewOperation,
} from '../components/insights';
import * as actionTypes from './constants';
import {
  logEventFailure,
  logExceptionFailure,
  trackPageViewFail,
} from './logging-actions';

/* eslint-disable */
/* TODO: To be checked by Donovan */

function* addUserToLog(payload) {
  const user = authentication().getUser();
  const username = (user && user.email) || '';
  return { ...payload, properties: { ...payload.properties, username } };
}

function* initLogging(action) {
  try {
    init(action.payload, logLevels.INFO);
  } catch (err) {
    console.log('something went wrong initializing AI');
  }
}

function* trackException(action) {
  try {
    let exception = yield addUserToLog(action.payload);
    // Add message as custom property of exception obj
    exception = {
      ...exception,
      properties: {
        ...exception.properties,
        exceptionMessage: action.payload.msg,
      },
    };
    trackExceptionInsight(exception);
  } catch (e) {
    yield put(logExceptionFailure(e));
  }
}

function* trackLog(action) {
  try {
    const event = yield addUserToLog({
      msg: action.payload,
      properties: action.properties,
    });
    trackEventInsight(event);
  } catch (e) {
    yield put(logEventFailure(e));
  }
}

function* trackPage(action) {
  try {
    const page = yield addUserToLog(action.payload);
    trackPageViewOperation(page);
  } catch (err) {
    yield put(trackPageViewFail(err));
  }
}

function stringifyValues(object) {
  return Object.keys(object).reduce(
    (res, key) => ({ ...res, [key]: JSON.stringify(object[key]) }),
    {},
  );
}

/**
 * Attach the payload of the action to the properties field of the event
 * @param {object} action Action object dispatched by store
 */
function getActionLogProperties(action) {
  let properties = '';
  const msges = action.type.split('_');
  const ACTION_STATUS = msges[msges.length - 1];
  try {
    if (action.payload instanceof Array) {
      properties = { data: JSON.stringify(action.payload) };
    } else if (typeof action.payload === 'object') {
      properties = stringifyValues(action.payload);
    } else {
      // in case of string or number --> don't destruct
      properties = { data: action.payload };
    }
  } catch (err) {
    properties = '';
  }
  if (
    ACTION_STATUS.toLowerCase() === 'success' ||
    ACTION_STATUS === 'failed' ||
    ACTION_STATUS === 'fail'
  ) {
    return { ...properties, ACTION_STATUS };
  }
  return properties;
}

/**
 * Every action dispatched by store will be loggeds
 * @param {object} action Action object dispatched by store
 */
function* genericActionListener(action) {
  if (
    action.type &&
    action.type !== actionTypes.LOG_EVENT_SUCCESS &&
    action.type !== actionTypes.LOG_EVENT_FAILURE &&
    action.type !== actionTypes.TRACK_PAGE_VIEW &&
    action.type !== actionTypes.LOG_EXCEPTION_SUCCESS &&
    action.type !== actionTypes.LOG_EXCEPTION_FAILURE
  ) {
    const msg = `[ACTION]: ${action.type}`;
    const properties = getActionLogProperties(action);
    yield trackLog({ payload: msg, properties });
  }
}

export default [
  takeLatest(actionTypes.INIT_LOGGING, initLogging),
  takeEvery(actionTypes.LOG_EXCEPTION, trackException),
  takeEvery('*', genericActionListener),
  takeEvery(actionTypes.LOG_EVENT, trackLog),
  takeEvery(actionTypes.TRACK_PAGE_VIEW, trackPage),
];
