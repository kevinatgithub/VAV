import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { GET_USER_SUCCESS, GET_USER_REQUEST, GET_USER_FAILURE } from './constants';

export const details = handleActions(
  {
    [GET_USER_SUCCESS]: (_, { payload }) => payload,
  },
  null,
);

export const loading = handleActions(
  {
    [GET_USER_REQUEST]: () => true,
    [GET_USER_SUCCESS]: () => false,
    [GET_USER_FAILURE]: () => false,
  },
  false,
);

export default combineReducers({
  details,
  loading,
});
