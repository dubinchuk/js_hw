import { ADMIN_PASSWORD, ADMIN_USERNAME, BASE_URL } from '../../config/environment.js';
import { SignInPage } from '../pages/signIn.page.js';

export class SignInService {
  constructor(private signInPage = new SignInPage()) {}

  async openSignInPage() {
    await this.signInPage.openPage(BASE_URL);
    await this.signInPage.waitForOpened();
  }

  async login(credentials?: { login?: string; password?: string }) {
    await this.signInPage.fillCredentials(credentials);
    await this.signInPage.clickOnLogin();
    await this.signInPage.waitForSpinnerToHide();
  }

  async loginAsAdmin() {
    await this.login({ login: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }
}
