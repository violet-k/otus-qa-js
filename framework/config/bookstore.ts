import 'dotenv/config';

const baseURL =
  process.env.BOOKSTORE_API_URL ?? 'https://bookstore.demoqa.com/Account/v1';

export const bookstore = Object.freeze({
  baseURL,
  paths: {
    user: '/User',
    authorized: '/Authorized',
    generateToken: '/GenerateToken'
  },
  credentials: {
    userName: process.env.BOOKSTORE_TEST_USER ?? '',
    password: process.env.BOOKSTORE_TEST_PASSWORD ?? ''
  }
});
