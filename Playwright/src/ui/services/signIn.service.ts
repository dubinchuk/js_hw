import { Page } from '@playwright/test';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import { IUserCredentials } from '../../data/types/user.types.js';
import { HomePage } from '../pages/home.page.js';
import { SignInPage } from '../pages/login.page.js';

export class SignInService {
  private signInPage: SignInPage;
  private homePage: HomePage;
  constructor(protected page: Page) {
    this.signInPage = new SignInPage(page);
    this.homePage = new HomePage(page);
  }

  async openSalesPortal() {
    await this.signInPage.openPage('https://anatoly-karpovich.github.io/aqa-course-project');
  }

  async login(credentials: IUserCredentials) {
    await this.signInPage.fillCredentialsInputs(credentials);
    await this.signInPage.clickSubmitButton();
    await this.signInPage.waitForSpinnerToHide();
    await this.homePage.waitForOpened();
  }

  async loginAsAdmin() {
    await this.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }
}
