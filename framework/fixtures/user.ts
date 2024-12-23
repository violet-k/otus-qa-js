import { faker } from '@faker-js/faker';

export const generateUser = () => {
  return {
    userName: faker.internet.email(),
    password: 'Password!1'
  };
};
