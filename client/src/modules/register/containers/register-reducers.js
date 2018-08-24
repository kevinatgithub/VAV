import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { REGISTER_USER_REQUEST, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from './constants';

export const loading = handleActions(
  {
    [REGISTER_USER_REQUEST]: () => true,
    [REGISTER_USER_FAILURE]: () => false,
    [REGISTER_USER_SUCCESS]: () => false,
  },
  false,
);

export const registered = handleActions(
  {
    [REGISTER_USER_REQUEST]: () => false,
    [REGISTER_USER_FAILURE]: () => false,
    [REGISTER_USER_SUCCESS]: () => true,
  },
  false,
);

export default combineReducers({
  loading,
  registered,
});
