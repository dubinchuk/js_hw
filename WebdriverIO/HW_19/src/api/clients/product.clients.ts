import { ApiClientFactory } from '../../utils/apiClients/apiClientFactory.js';
import { BaseProductApiClient } from './baseProduct.clients.js';

export class ProductsAxiosApiClient extends BaseProductApiClient {
  constructor() {
    super(ApiClientFactory.createClient('axios'));
  }
}

export class ProductsFetchApiClient extends BaseProductApiClient {
  constructor() {
    super(ApiClientFactory.createClient('fetch'));
  }
}
