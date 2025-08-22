import { IUserCredentials } from '../../data/types/user.types.js';
import { SalesPortalPage } from './salesPortal.page.js';

export class SignInPage extends SalesPortalPage {
  readonly uniqueElement = '//input[@id="emailinput"]';
  private readonly 'Email input' = '#emailinput';
  readonly 'Password input' = '#passwordinput';
  private readonly 'Login button' = 'button.btn-lg';

  async fillCredentials(credentials: IUserCredentials) {
    credentials.username && (await this.setValue(this['Email input'], credentials.username));
    credentials.password && (await this.setValue(this['Password input'], credentials.password));
  }

  async clickOnLogin() {
    await this.click(this['Login button']);
  }
}
