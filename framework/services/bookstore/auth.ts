import { bookstore } from 'config';
import {
  BookstoreErrorResponse,
  TokenData,
  UserCredentials
} from 'types/bookstore';
import { axios } from './axios';

const authorize = async ({ userName, password }: UserCredentials) => {
  const response = await axios.post<TokenData | BookstoreErrorResponse>(
    bookstore.paths.generateToken,
    {
      userName,
      password
    }
  );

  return response;
};

const authorized = async ({ userName, password }: UserCredentials) => {
  const response = await axios.post<boolean | BookstoreErrorResponse>(
    bookstore.paths.authorized,
    {
      userName,
      password
    }
  );

  return response;
};

export const AuthService = {
  authorize,
  authorized
};
