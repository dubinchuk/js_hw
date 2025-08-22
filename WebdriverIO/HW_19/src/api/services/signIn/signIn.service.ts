import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../../config/environment.js';
import { logStep } from '../../../utils/report/decorator.js';
import { SignInAxiosApiClient, SignInFetchApiClient } from '../../clients/signIn.clients.js';

export class SignInAxiosApiService {
  private token: string | null = null;

  constructor(private signInAxiosClient = new SignInAxiosApiClient()) {}

  @logStep('Sign in as Admin via API')
  async signInAsAdminApi() {
    const response = await this.signInAxiosClient.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    this.setToken(response.headers.authorization);
    return response.headers.authorization;
  }

  removeToken() {
    this.token = null;
  }

  getToken() {
    return this.getConvertedToken();
  }

  private setToken(token: string) {
    this.token = token;
  }

  private getConvertedToken() {
    return `Bearer ${this.token}`;
  }
}

export class SignInFetchApiService {
  private token: string | null = null;

  constructor(private signInFetchClient = new SignInFetchApiClient()) {}

  @logStep('Sign in as Admin via API')
  async signInAsAdminApi() {
    const response = await this.signInFetchClient.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    const headers = new Headers(response.headers);
    this.setToken(headers.get('authorization')!);
    return response.headers.authorization;
  }

  removeToken() {
    this.token = null;
  }

  getToken() {
    return this.getConvertedToken();
  }

  private setToken(token: string) {
    this.token = token;
  }

  private getConvertedToken() {
    return `Bearer ${this.token}`;
  }
}
