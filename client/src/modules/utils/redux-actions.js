import { createAction, handleActions } from 'redux-actions';

function underscoreToCamelCase(str) {
  const arr = str.split(/[_-]/);
  let newStr = '';
  for (let i = 1; i < arr.length; i++) { // eslint-disable-line no-plusplus
    newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
  }
  return arr[0].toLowerCase() + newStr;
}

export function createAsyncActionTypes(baseActionType) {
  return {
    [`${baseActionType}_REQUEST`]: `${baseActionType}_REQUEST`,
    [`${baseActionType}_SUCCESS`]: `${baseActionType}_SUCCESS`,
    [`${baseActionType}_FAIL`]: `${baseActionType}_FAIL`,
  };
}

export function createAsyncActions(requestActionType, successActionType, failActionType) {
  return {
    [underscoreToCamelCase(requestActionType)]: createAction(requestActionType),
    [underscoreToCamelCase(successActionType)]: createAction(successActionType),
    [underscoreToCamelCase(failActionType)]: createAction(failActionType),
  };
}

export function handleActionsWithReset(reducerMap, initialState, resetActionType) {
  return handleActions({ ...reducerMap, [resetActionType]: () => initialState }, initialState);
}
