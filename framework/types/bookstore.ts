export interface BookstoreErrorResponse {
  code: number;
  message: string;
}

export interface UserCredentials {
  userName: string;
  password: string;
}

export interface UserData {
  userId: string;
  username: string;
  books: [
    {
      isbn: string;
      title: string;
      subTitle: string;
      author: string;
      publish_date: string;
      publisher: string;
      pages: number;
      description: string;
      website: string;
    }
  ];
}

export interface CreatedUserData extends Omit<UserData, 'userId'> {
  userID: string;
}

export interface TokenData {
  token: string;
  expires: string;
  status: string;
  result: string;
}
