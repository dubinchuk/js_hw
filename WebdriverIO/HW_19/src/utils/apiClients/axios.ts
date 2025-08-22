import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiClient, IRequestOptions, IResponse } from '../../data/types/api.types.js';
import { AllureReporter } from '../report/allure.reporter.js';
import { IProduct } from '../../data/types/product.types.js';

export class AxiosApiClient implements ApiClient {
  private response: AxiosResponse | undefined;
  constructor(private reporter = new AllureReporter()) {}

  async send<RequestT, ResponseT>(options: IRequestOptions<RequestT>): Promise<IResponse<ResponseT>> {
    try {
      this.response = await axios(options as AxiosRequestConfig);
      return this.transformResponse<ResponseT>();
    } catch (err: unknown) {
      if (!isAxiosError(err)) throw err;
      console.log('Error', err.message);
      console.log('Request URL:', options.method, options.url);
      this.response = err.response;
      return this.transformResponse<ResponseT>();
    } finally {
      this.reporter.reportApiRequest(options as IRequestOptions<IProduct>, this.transformResponse());
    }
  }

  private transformResponse<ResponseT>(): IResponse<ResponseT> {
    return {
      status: this.response!.status,
      body: this.response?.data as ResponseT,
      headers: this.response?.headers as Record<string, string>
    };
  }
}

function isAxiosError(err: unknown): err is AxiosError {
  return err instanceof AxiosError;
}
