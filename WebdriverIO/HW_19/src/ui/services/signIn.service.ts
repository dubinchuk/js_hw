import { ADMIN_PASSWORD, ADMIN_USERNAME, BASE_URL } from '../../config/environment.js';
import { SignInPage } from '../pages/signIn.page.js';
import { logStep } from '../../utils/report/decorator.js';
import { IUserCredentials } from '../../data/types/user.types.js';

export class SignInService {
  constructor(private signInPage = new SignInPage()) {}

  @logStep('Open Sales Portal')
  async openSignInPage() {
    await this.signInPage.openPage(BASE_URL);
    await this.signInPage.waitForOpened();
  }

  @logStep('Login')
  async login(credentials: IUserCredentials) {
    await this.signInPage.fillCredentials(credentials);
    await this.signInPage.clickOnLogin();
    await this.signInPage.waitForSpinnerToHide();
  }

  @logStep('Login as Admin')
  async loginAsAdmin() {
    await this.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }

  @logStep('Sign Out')
  async signOut() {
    await this.signInPage.deleteCookies(['Authorization']);
  }
}
