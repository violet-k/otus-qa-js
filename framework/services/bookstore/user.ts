import { bookstore } from 'config';
import {
  BookstoreErrorResponse,
  CreatedUserData,
  TokenData,
  UserCredentials,
  UserData
} from 'types/bookstore';
import { axios } from './axios';

const create = async ({ userName, password }: UserCredentials) => {
  const response = await axios.post<CreatedUserData | BookstoreErrorResponse>(
    bookstore.paths.user,
    {
      userName,
      password
    }
  );

  return response;
};

interface GetProps {
  userId: UserData['userId'];
  token: TokenData['token'];
}
const get = async ({ userId, token }: GetProps) => {
  const response = await axios.get<UserData | BookstoreErrorResponse>(
    `${bookstore.paths.user}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response;
};

type DeleteProps = GetProps;

const _delete = async ({ userId, token }: DeleteProps) => {
  const response = await axios.delete<
    Pick<UserData, 'userId'> | BookstoreErrorResponse
  >(`${bookstore.paths.user}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response;
};

export const UserService = {
  create,
  delete: _delete,
  get
};
