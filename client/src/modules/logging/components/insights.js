/* eslint-disable */
/* TODO: To be checked by Donovan */

// import ReactAI from 'react-appinsights';
// import {
//   info,
//   error,
//   configureLoggers,
//   types,
//   trackPageView,
// } from '@dlw/dlw-logger';

/**
 * Write exception to logger (ex: Application Insights)
 * @param {Object} args Object with information about the exception
 */
export const trackExceptionInsight = args => {
  const { err, msg, properties, measurements, severityLevel } = args;
  err.message = msg;
  // TODO: use dlw logger package

  // error({
  //   message: err,
  //   properties,
  //   measurements,
  //   severityLevel,
  //   handledAt: msg,
  // });
};

/**
* Write event to logger (ex: Application Insights)
 * @param {Object} args Object with information about the event
 */
export const trackEventInsight = args => {
  const { msg, properties, measurements } = args;
  // TODO: use dlw logger package
  // info({ message: msg, properties, measurements });
};

/**
 * Write page view to logger (ex: Application Insights)
 * @param {Object} args Object with information about the page view
 */
export const trackPageViewOperation = args => {
  const { page, url, properties } = args;
  // TODO: use dlw logger package
  // trackPageView({ page, url, properties });
};

/**
 * Setup logging
 * @param {string} instrumentationKey
 * @param {string} logLevel
 */
export const init = (instrumentationKey, logLevel = 3) => {
  // const config = [
  //   {
  //     type: types.APP_INSIGHTS,
  //     instrumentationKey,
  //     minimumLogLevel: logLevel,
  //   },
  // ];
  // TODO: confgire dlw logger package
  // configureLoggers(config);
};
