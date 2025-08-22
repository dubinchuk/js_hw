import { SalesPortalPage } from './salesPortal.page.js';

export class SignInPage extends SalesPortalPage {
  readonly uniqueElement = '//input[@id="emailinput"]';
  protected readonly emailInput = '#emailinput';
  protected readonly passwordInput = '#passwordinput';
  protected readonly loginButton = 'button.btn-lg';

  async fillCredentials(credentials?: { login?: string; password?: string }) {
    credentials?.login && (await this.setValue(this.emailInput, credentials.login));
    credentials?.password && (await this.setValue(this.passwordInput, credentials.password));
  }

  async clickOnLogin() {
    await this.click(this.loginButton);
  }
}
