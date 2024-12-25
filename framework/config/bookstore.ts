import 'dotenv/config';

const baseURL = process.env.BOOKSTORE_API_URL ?? 'https://bookstore.demoqa.com';

export const bookstore = Object.freeze({
  baseURL,
  paths: {
    user: '/Account/v1/User',
    authorized: '/Account/v1/Authorized',
    generateToken: '/Account/v1/GenerateToken',
    books: '/BookStore/v1/Books',
    book: '/BookStore/v1/Book'
  },
  credentials: {
    userName: process.env.BOOKSTORE_TEST_USER ?? '',
    password: process.env.BOOKSTORE_TEST_PASSWORD ?? ''
  }
});
