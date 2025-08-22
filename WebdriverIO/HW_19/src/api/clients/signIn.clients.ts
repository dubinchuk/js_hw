import { apiConfig } from '../../config/apiConfig.js';
import { IRequestOptions, STATUS_CODES } from '../../data/types/api.types.js';
import { ILoginResponse, IUserCredentials } from '../../data/types/user.types.js';
import { ApiClientFactory } from '../../utils/apiClients/apiClientFactory.js';
import { logStep } from '../../utils/report/decorator.js';

export class SignInAxiosApiClient {
  constructor(private apiClient = ApiClientFactory.createClient('axios')) {}

  @logStep('Sign in via API')
  async login(credentials: IUserCredentials) {
    const options: IRequestOptions<IUserCredentials> = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Login,
      data: credentials,
      headers: { 'Content-Type': 'application/json' },
      method: 'post'
    };
    const response = await this.apiClient.send<IUserCredentials, ILoginResponse>(options);
    expect(response.status).toBe(STATUS_CODES.OK);
    return response;
  }
}

export class SignInFetchApiClient {
  constructor(private apiClient = ApiClientFactory.createClient('fetch')) {}

  @logStep('Sign in via API')
  async login(credentials: IUserCredentials) {
    const response = await this.apiClient.send<IUserCredentials, ILoginResponse>({
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Login,
      data: credentials,
      headers: { 'Content-Type': 'application/json' },
      method: 'post'
    });
    expect(response.status).toBe(STATUS_CODES.OK);
    return response;
  }
}
