import _axios from 'axios';
import { bookstore } from 'config';

export const axios = _axios.create({
  baseURL: bookstore.baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: () => true
});
