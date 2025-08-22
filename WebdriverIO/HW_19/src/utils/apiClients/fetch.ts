import { ApiClient, IRequestOptions, IResponse, STATUS_CODES } from '../../data/types/api.types.js';
import _ from 'lodash';
import { IFetchError, IApiError } from '../../data/types/error.types.js';
import { IProduct, IProductResponse } from '../../data/types/product.types.js';
import { AllureReporter } from '../report/allure.reporter.js';

export class FetchApiClient implements ApiClient {
  constructor(private reporter = new AllureReporter()) {}

  private response: Response | undefined;

  async send<RequestT, ResponseT>(options: IRequestOptions<RequestT>): Promise<IResponse<ResponseT>> {
    let responseData: IResponse<ResponseT> | undefined;
    try {
      const fetchOptions: RequestInit = {
        method: options.method.toUpperCase(),
        headers: new Headers(options.headers),
        body: options.data ? JSON.stringify(options.data) : undefined
      };

      this.response = await fetch(options.baseURL + options.url, fetchOptions);

      if (this.response?.status >= 400 && this.response?.status < 600) {
        let errBody = null;
        try {
          errBody = await this.response.json();
        } catch (err) {}
        const apiError = getApiError(this.response.status, this.response.statusText, errBody);
        throw apiError;
      }

      responseData = await this.transformResponse<ResponseT>();
      return responseData;
    } catch (err: unknown) {
      if (!isFetchError(err)) throw err;
      console.log('Error', err);
      console.log('Request URL:', options.method, options.url);
      responseData = await this.transformResponse<ResponseT>();
      return responseData;
    } finally {
      this.reporter.reportApiRequest(options as IRequestOptions<IProduct>, responseData as IResponse<IProductResponse>);
    }
  }

  private async transformResponse<ResponseT>(): Promise<IResponse<ResponseT>> {
    let body = null;

    if (this.response && this.response.status !== STATUS_CODES.DELETED) {
      try {
        body = await this.response.json();
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        body = null;
      }
    }

    return {
      status: this.response!.status,
      body: body as ResponseT,
      headers: this.response?.headers as unknown as Record<string, string>
    };
  }
}

function isFetchError(err: unknown): err is IFetchError {
  return err instanceof Error && ('response' in err || 'status' in err || 'statusText' in err || 'body' in err);
}

function getApiError(status: number, statusText: string, body: any): IApiError {
  const err = new Error(`API Error: ${status} ${statusText}`) as unknown as IApiError;
  err.status = status;
  err.statusText = statusText;
  err.body = body;
  return err;
}
