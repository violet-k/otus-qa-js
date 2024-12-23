import { books, UserFixtures } from 'fixtures';
import { AuthService, BooksService, UserService } from 'services';
import { CreatedUserData } from 'types/bookstore';

const user = UserFixtures.generateUser();

const nonExistingISBNs = ['1', '2', '3'];
const booksToAdd = [books[1], books[2], books[3]];
const booksToChangeTo = [books[4], books[5], books[6]];
const booksToChange = booksToAdd.map((book, index) => ({
  book,
  otherBook: booksToChangeTo[index]
}));

describe('Bookstore Books', () => {
  let createdUser: CreatedUserData;
  let userId = '';
  let token = '';

  beforeAll(async () => {
    const [{ data }] = await UserService.create(user);
    const [{ data: authData }] = await AuthService.authorize(user);
    createdUser = data;
    userId = createdUser.userID;
    token = authData.token;
  });

  it('список книг', async () => {
    const [response] = await BooksService.list();

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ books });
  });

  test.each(nonExistingISBNs)(
    'получение информации о несуществующей книге с ISBN %d',
    async (isbn) => {
      const [, { data, status }] = await BooksService.get({
        isbn,
        token
      });

      expect(status).toEqual(400);
      expect(data.code).toBe('1205');
      expect(data.message).toBe(
        'ISBN supplied is not available in Books Collection!'
      );
    }
  );

  test.each(booksToAdd)(
    'получение информации о существующей книге с ISBN $isbn',
    async (book) => {
      const [, { data, status }] = await BooksService.get({
        isbn: book.isbn,
        token
      });

      expect(status).toEqual(200);
      expect(data).toStrictEqual(book);
    }
  );

  test.each(booksToAdd)('добавление книги с ISBN $isbn', async (book) => {
    const [{ data, status }] = await BooksService.create({
      userId,
      collectionOfIsbns: [book.isbn],
      token
    });

    expect(status).toEqual(201);
    expect(data).toStrictEqual({ books: [{ isbn: book.isbn }] });
  });

  test.each(booksToChange)(
    'замена книги с ISBN $book.isbn на $otherBook.isbn',
    async ({ book, otherBook }) => {
      const [{ data, status }] = await BooksService.update({
        isbn: book.isbn,
        replaceIsbn: {
          userId,
          isbn: otherBook.isbn
        },
        token
      });

      expect(status).toEqual(200);
      expect(data.userId).toEqual(userId);
      expect(data.username).toEqual(user.userName);
      expect(
        data.books.find(({ isbn }) => isbn === otherBook.isbn)
      ).toStrictEqual(otherBook);
    }
  );

  test.each(booksToChangeTo)('удаление книги с ISBN $isbn', async (book) => {
    const [{ status }] = await BooksService.delete({
      userId,
      isbn: book.isbn,
      token
    });

    expect(status).toEqual(204);
  });
});
