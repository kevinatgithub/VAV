import { getUserRequest, getUserSuccess, getUserFailure } from '../user-actions';
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from '../constants';

describe('user-actions', () => {
  it('getUserRequest action', () => {
    const expectedAction = {
      type: GET_USER_REQUEST,
    };
    expect(getUserRequest()).toEqual(expectedAction);
  });
  it('getUserSuccess action', () => {
    const expectedAction = {
      type: GET_USER_SUCCESS,
    };
    expect(getUserSuccess()).toEqual(expectedAction);
  });
  it('getUserFailure action', () => {
    const expectedAction = {
      type: GET_USER_FAILURE,
    };
    expect(getUserFailure()).toEqual(expectedAction);
  });
});
