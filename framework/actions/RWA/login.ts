import { Page } from '@playwright/test';

import { rwa } from 'config';
import { LoginPage } from 'pages';

export function login(page: Page) {
  const loginPage = new LoginPage(page);

  return ({ email, password }: { email: string; password: string }) => {
    return loginPage.login(email, password);
  };
}

export function loginUser(page: Page) {
  return login(page)({ email: rwa.email, password: rwa.password });
}
