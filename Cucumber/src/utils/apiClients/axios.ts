import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AllureReporter } from '../report/allure.reporter.js';
import { IRequestOptions, IResponse } from '../../data/types/api.types.js';

export class AxiosApiClient {
  private response: AxiosResponse | undefined;

  constructor(private reporter = new AllureReporter()) {}

  async send<T>(options: IRequestOptions): Promise<IResponse<T>> {
    try {
      this.response = await axios(options as AxiosRequestConfig);
      return this.transformResponse();
    } catch (err: unknown) {
      if (!isAxiosError(err)) throw err;
      console.log('Error', err.message);
      console.log('Request URL:', options.method, options.url);
      this.response = err.response;
      return this.transformResponse();
    } finally {
      this.reporter.reportApiRequest(options, this.transformResponse());
    }
  }

  private transformResponse() {
    return {
      status: this.response!.status,
      body: this.response && this.response.data ? this.response.data : null,
      headers: this.response!.headers as Record<string, string>,
    };
  }
}

function isAxiosError(err: unknown): err is AxiosError {
  return err instanceof AxiosError;
}
