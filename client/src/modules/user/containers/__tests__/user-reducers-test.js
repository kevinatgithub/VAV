import { details } from '../user-reducers';
import { getUserSuccess } from '../user-actions';

describe('user-reducers', () => {
  const mockUser = {
    id: '7d1fd97c-7492-4295-96f5-c277fb5dc75c',
    username: 'benny@ad.csp.dlwnet.com ',
    name: 'Benny Smedts',
    context: [
      'customer1',
    ],
  };

  it('handles user details mutation', () => {
    expect(
      details({}, getUserSuccess(mockUser)),
    ).toEqual(mockUser);
  });
});
