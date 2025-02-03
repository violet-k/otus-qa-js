import 'dotenv/config';

const baseURL = process.env.STACKEDIT_API_URL ?? 'https://stackedit.io/app#';

export const stackEdit = Object.freeze({
  baseURL
});
