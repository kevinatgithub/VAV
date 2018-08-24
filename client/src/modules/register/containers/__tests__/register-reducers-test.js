import { loading, registered } from '../register-reducers';
import { registerUser, registerUserSuccess, registerUserFailure } from '../register-actions';

describe('register-reducers', () => {
  it('handles loading mutation', () => {
    expect(
      loading(false, registerUser()),
    ).toEqual(true);

    expect(
      loading(true, registerUserSuccess()),
    ).toEqual(false);

    expect(
      loading(true, registerUserFailure()),
    ).toEqual(false);
  });

  it('handles registered mutation', () => {
    expect(
      registered(true, registerUser()),
    ).toEqual(false);

    expect(
      registered(false, registerUserSuccess()),
    ).toEqual(true);

    expect(
      registered(true, registerUserFailure()),
    ).toEqual(false);
  });
});
