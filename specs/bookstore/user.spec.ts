import Ajv from 'ajv';
import { UserFixtures } from 'fixtures';
import { userSchema } from 'schemas';
import { AuthService, UserService } from 'services';
import { CreatedUserData } from 'types/bookstore';

const user = UserFixtures.generateUser();

const ajv = new Ajv();
const validateUser = ajv.compile(userSchema);

describe('Bookstore User', () => {
  let token = '';
  let createdUser: CreatedUserData;

  describe('создание', () => {
    it('успех', async () => {
      const [{ data, status }] = await UserService.create(user);

      createdUser = data;

      expect(validateUser(data)).toBe(true);
      expect(status).toEqual(201);
    });

    it('некорректный пароль', async () => {
      const [, { data, status }] = await UserService.create({
        ...user,
        password: 'password'
      });

      expect(status).toEqual(400);
      expect(data.code).toEqual('1300');
    });

    it('логин уже используется', async () => {
      const [, { data, status }] = await UserService.create(user);

      expect(status).toEqual(406);
      expect(data.code).toEqual('1204');
    });
  });

  describe('получение информации о пользователе', () => {
    let userId = '';

    beforeEach(async () => {
      userId = createdUser.userID;
    });

    it('ошибка - не авторизован', async () => {
      const [{ data: isAuthorized }] = await AuthService.authorized(user);
      const [, { data, status }] = await UserService.get({ userId, token });

      expect(isAuthorized).toBe(false);
      expect(data.code).toEqual('1200');
      expect(status).toEqual(401);
    });

    it('успех', async () => {
      const [{ data: authData }] = await AuthService.authorize(user);
      const [{ data: isAuthorized }] = await AuthService.authorized(user);
      token = authData.token;

      const [{ data, status }] = await UserService.get({ userId, token });

      expect(isAuthorized).toBe(true);
      expect(data.userId).toEqual(userId);
      expect(status).toEqual(200);
    });

    it('ошибка - несуществующий пользователь', async () => {
      const [{ data: authData }] = await AuthService.authorize(user);
      const [{ data: isAuthorized }] = await AuthService.authorized(user);
      token = authData.token;

      const [, { data, status }] = await UserService.get({
        userId: 'wrong-id',
        token
      });

      expect(isAuthorized).toBe(true);
      expect(data.code).toEqual('1207');
      expect(status).toEqual(401);
    });
  });

  describe('удаление', () => {
    let userId = '';

    beforeEach(async () => {
      userId = createdUser.userID;
    });

    it('успех', async () => {
      const [{ data: isAuthorized }] = await AuthService.authorized(user);

      const [{ status }] = await UserService.delete({ userId, token });

      expect(isAuthorized).toBe(true);
      expect(status).toEqual(204);
    });

    it('ошибка - повторное удаление', async () => {
      const [, { data, status }] = await UserService.delete({ userId, token });

      expect(data.code).toEqual('1207');
      expect(status).toEqual(200);
    });
  });
});
