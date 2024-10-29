import crypto from 'node:crypto';

const BOOKSTORE_API_URL = 'https://bookstore.demoqa.com/';

const urls = {
  USER: `${BOOKSTORE_API_URL}Account/v1/User`,
  GENERATE_TOKEN: `${BOOKSTORE_API_URL}Account/v1/GenerateToken`
};

const user = {
  userName: crypto.randomBytes(8).toString('hex'),
  password: 'Password!1'
};

describe('Bookstore API', () => {
  describe('Создание пользователя', () => {
    it('успешное создание', async () => {
      const response = await fetch(urls.USER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      expect(response.status).toEqual(201);
    });

    it('пароль не подходит', async () => {
      const response = await fetch(urls.USER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: user.userName,
          password: 'password'
        })
      });
      const data = await response.json();
      expect(response.status).toEqual(400);
      expect(data.code).toEqual('1300');
    });

    it('логин уже используется', async () => {
      const response = await fetch(urls.USER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      expect(response.status).toEqual(406);
      expect(data.code).toEqual('1204');
    });
  });

  describe('Генерация токена', () => {
    it('успех', async () => {
      const response = await fetch(urls.GENERATE_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      expect(response.status).toEqual(200);
      expect(data.token).toBeTruthy();
      expect(data.expires).toBeTruthy();
      expect(data.status).toBe('Success');
    });

    it('ошибка', async () => {
      const response = await fetch(urls.GENERATE_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: 'password'
        })
      });
      const data = await response.json();
      expect(response.status).toEqual(400);
      expect(data.code).toEqual('1200');
    });
  });
});
