import { JSONSchemaType } from 'ajv';
import { BookData } from 'types/bookstore';

export const bookSchema: JSONSchemaType<BookData> = {
  type: 'object',
  properties: {
    isbn: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    subTitle: {
      type: 'string'
    },
    author: {
      type: 'string'
    },
    publish_date: {
      type: 'string'
    },
    publisher: {
      type: 'string'
    },
    pages: {
      type: 'integer',
      minimum: 1
    },
    description: {
      type: 'string'
    },
    website: {
      type: 'string'
    }
  },
  required: [
    'isbn',
    'title',
    'subTitle',
    'author',
    'publish_date',
    'publisher',
    'pages',
    'description',
    'website'
  ],
  additionalProperties: false
};

export const userSchema = {
  type: 'object',
  properties: {
    userID: { type: 'string' },
    username: { type: 'string' },
    books: {
      type: 'array',
      minItems: 0,
      items: {
        $ref: '#/definitions/book'
      }
    }
  },
  required: ['userID', 'username', 'books'],
  additionalProperties: false,
  definitions: {
    book: bookSchema
  }
};
