import { AxiosResponse } from 'axios';
import { bookstore } from 'config';
import {
  BookData,
  BookstoreErrorResponse,
  UserData,
  WithToken
} from 'types/bookstore';
import { axios } from './axios';

type CreateProps = WithToken<{
  userId: UserData['userId'];
  collectionOfIsbns: BookData['isbn'][];
}>;

interface CreateResult {
  books: Pick<BookData, 'isbn'>[];
}

const create = async ({
  userId,
  collectionOfIsbns = [],
  token
}: CreateProps): Promise<
  [AxiosResponse<CreateResult>, AxiosResponse<BookstoreErrorResponse>]
> => {
  const data = JSON.stringify({
    userId,
    collectionOfIsbns: collectionOfIsbns.map((isbn) => ({
      isbn
    }))
  });

  const response = await axios.post<CreateResult | BookstoreErrorResponse>(
    bookstore.paths.books,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return [
    response as AxiosResponse<CreateResult>,
    response as AxiosResponse<BookstoreErrorResponse>
  ];
};

type GetProps = WithToken<Pick<BookData, 'isbn'>>;

const get = async ({
  isbn,
  token
}: GetProps): Promise<
  [AxiosResponse<BookData>, AxiosResponse<BookstoreErrorResponse>]
> => {
  const response = await axios.get<BookData | BookstoreErrorResponse>(
    bookstore.paths.book,
    {
      params: { ISBN: isbn },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return [
    response as AxiosResponse<BookData>,
    response as AxiosResponse<BookstoreErrorResponse>
  ];
};

type UpdateProps = WithToken<{
  isbn: BookData['isbn'];
  replaceIsbn: Pick<BookData, 'isbn'> & Pick<UserData, 'userId'>;
}>;

const update = async ({
  isbn,
  replaceIsbn,
  token
}: UpdateProps): Promise<
  [AxiosResponse<UserData>, AxiosResponse<BookstoreErrorResponse>]
> => {
  const response = await axios.put<UserData | BookstoreErrorResponse>(
    `${bookstore.paths.books}/${isbn}`,
    replaceIsbn,
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

type DeleteProps = WithToken<Pick<BookData, 'isbn'> & Pick<UserData, 'userId'>>;

const _delete = async ({
  userId,
  isbn,
  token
}: DeleteProps): Promise<
  [AxiosResponse<DeleteProps>, AxiosResponse<BookstoreErrorResponse>]
> => {
  const response = await axios.delete<DeleteProps | BookstoreErrorResponse>(
    bookstore.paths.book,
    {
      data: { userId, isbn },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return [
    response as AxiosResponse<DeleteProps>,
    response as AxiosResponse<BookstoreErrorResponse>
  ];
};

const list = async (): Promise<
  [AxiosResponse<BookData[]>, AxiosResponse<BookstoreErrorResponse>]
> => {
  const response = await axios.get<BookData[] | BookstoreErrorResponse>(
    bookstore.paths.books
  );

  return [
    response as AxiosResponse<BookData[]>,
    response as AxiosResponse<BookstoreErrorResponse>
  ];
};

export const BooksService = {
  create,
  get,
  update,
  delete: _delete,
  list
};
