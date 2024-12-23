import { AxiosResponse } from 'axios';
import { bookstore } from 'config';
import {
  BookstoreErrorResponse,
  TokenData,
  UserCredentials
} from 'types/bookstore';
import { axios } from './axios';

const authorize = async ({
  userName,
  password
}: UserCredentials): Promise<
  [AxiosResponse<TokenData>, AxiosResponse<BookstoreErrorResponse>]
> => {
  const response = await axios.post<TokenData | BookstoreErrorResponse>(
    bookstore.paths.generateToken,
    {
      userName,
      password
    }
  );

  return [
    response as AxiosResponse<TokenData>,
    response as AxiosResponse<BookstoreErrorResponse>
  ];
};

const authorized = async ({
  userName,
  password
}: UserCredentials): Promise<
  [AxiosResponse<boolean>, AxiosResponse<BookstoreErrorResponse>]
> => {
  const response = await axios.post<boolean | BookstoreErrorResponse>(
    bookstore.paths.authorized,
    {
      userName,
      password
    }
  );

  return [
    response as AxiosResponse<boolean>,
    response as AxiosResponse<BookstoreErrorResponse>
  ];
};

export const AuthService = {
  authorize,
  authorized
};
