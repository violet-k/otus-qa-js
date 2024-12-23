import { bookstore } from 'config';
import { AuthService } from 'services';

const user = bookstore.credentials;

describe('Авторизация', () => {
  it('успех', async () => {
    const [{ data, status }] = await AuthService.authorize(user);
    const [{ data: isAuthorized }] = await AuthService.authorized(user);

    const { token, expires, status: authStatus } = data;

    expect(status).toEqual(200);
    expect(token).toBeTruthy();
    expect(expires).toBeTruthy();
    expect(authStatus).toBe('Success');
    expect(isAuthorized).toBe(true);
  });

  it('ошибка', async () => {
    const [{ data, status }] = await AuthService.authorize({
      ...user,
      password: 'password'
    });
    const { token, status: authStatus } = data;

    expect(status).toEqual(200);
    expect(token).toEqual(null);
    expect(authStatus).toBe('Failed');
  });
});
