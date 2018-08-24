import { registerUser, registerUserSuccess, registerUserFailure } from '../register-actions';
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from '../constants';

describe('register-actions', () => {
  it('registerUser action', () => {
    const expectedAction = {
      type: REGISTER_USER_REQUEST,
    };
    expect(registerUser()).toEqual(expectedAction);
  });
  it('registerUserSuccess action', () => {
    const expectedAction = {
      type: REGISTER_USER_SUCCESS,
    };
    expect(registerUserSuccess()).toEqual(expectedAction);
  });
  it('registerUserFailure action', () => {
    const expectedAction = {
      type: REGISTER_USER_FAILURE,
    };
    expect(registerUserFailure()).toEqual(expectedAction);
  });
});
