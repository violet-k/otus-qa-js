import { AxiosResponse } from 'axios';
import { bookstore } from 'config';
import {
  BookstoreErrorResponse,
  CreatedUserData,
  UserCredentials,
  UserData,
  WithToken
} from 'types/bookstore';
import { axios } from './axios';

const create = async ({
  userName,
  password
}: UserCredentials): Promise<
  [AxiosResponse<CreatedUserData>, AxiosResponse<BookstoreErrorResponse>]
> => {
  const response = await axios.post<CreatedUserData | BookstoreErrorResponse>(
    bookstore.paths.user,
    {
      userName,
      password
    }
  );

  return [
    response as AxiosResponse<CreatedUserData>,
    response as AxiosResponse<BookstoreErrorResponse>
  ];
};

type GetProps = WithToken<Pick<UserData, 'userId'>>;

const get = async ({
  userId,
  token
}: GetProps): Promise<
  [AxiosResponse<UserData>, AxiosResponse<BookstoreErrorResponse>]
> => {
  const response = await axios.get<UserData | BookstoreErrorResponse>(
    `${bookstore.paths.user}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return [
    response as AxiosResponse<UserData>,
    response as AxiosResponse<BookstoreErrorResponse>
  ];
};

type DeleteProps = GetProps;

const _delete = async ({
  userId,
  token
}: DeleteProps): Promise<
  [
    AxiosResponse<Pick<UserData, 'userId'>>,
    AxiosResponse<BookstoreErrorResponse>
  ]
> => {
  const response = await axios.delete<
    Pick<UserData, 'userId'> | BookstoreErrorResponse
  >(`${bookstore.paths.user}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return [
    response as AxiosResponse<Pick<UserData, 'userId'>>,
    response as AxiosResponse<BookstoreErrorResponse>
  ];
};

export const UserService = {
  create,
  delete: _delete,
  get
};
