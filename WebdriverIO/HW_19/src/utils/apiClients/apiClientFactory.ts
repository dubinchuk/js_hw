import { ApiClient } from '../../data/types/api.types.ts';
import { AxiosApiClient } from './axios.ts';
import { FetchApiClient } from './fetch.ts';

export class ApiClientFactory {
  static createClient(type: 'fetch' | 'axios'): ApiClient {
    switch (type) {
      case 'fetch':
        return new FetchApiClient();
      case 'axios':
        return new AxiosApiClient();
    }
  }
}
