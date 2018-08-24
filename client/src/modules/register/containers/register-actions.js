import { createAction } from 'redux-actions';
import * as actionTypes from './constants';

export const registerUser = createAction(actionTypes.REGISTER_USER_REQUEST);
export const registerUserSuccess = createAction(actionTypes.REGISTER_USER_SUCCESS);
export const registerUserFailure = createAction(actionTypes.REGISTER_USER_FAILURE);
