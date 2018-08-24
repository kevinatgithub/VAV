import { createAction } from 'redux-actions';
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from './constants';

export const getUserRequest = createAction(GET_USER_REQUEST);
export const getUserSuccess = createAction(GET_USER_SUCCESS);
export const getUserFailure = createAction(GET_USER_FAILURE);
