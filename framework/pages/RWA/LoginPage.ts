import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private emailInput = 'input-email';
  private passwordInput = 'input-password';
  private loginButton = 'btn-submit';

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigateTo('/login');
  }

  async login(email: string, password: string) {
    await this.navigate();
    await this.page.getByTestId(this.emailInput).fill(email);
    await this.page.getByTestId(this.passwordInput).fill(password);
    await this.page.getByTestId(this.loginButton).click();
  }
}
