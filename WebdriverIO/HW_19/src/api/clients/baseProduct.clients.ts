import { apiConfig } from '../../config/apiConfig.js';
import { IResponse, IRequestOptions, ApiClient } from '../../data/types/api.types.js';
import { IProduct, IProductResponse } from '../../data/types/product.types.js';
import { logStep } from '../../utils/report/decorator.js';

export class BaseProductApiClient {
  constructor(protected apiClient: ApiClient) {}

  @logStep('Create product via API')
  async create(product: IProduct, token: string): Promise<IResponse<IProductResponse>> {
    const options: IRequestOptions<IProduct> = {
      method: 'post',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Products,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: product
    };

    return this.apiClient.send<IProduct, IProductResponse>(options);
  }

  @logStep('Get product by id via API')
  async getById(id: string, token: string): Promise<IResponse<IProductResponse>> {
    const options: IRequestOptions<IProduct> = {
      method: 'get',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Products + `${id}/`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    };
    return this.apiClient.send<IProduct, IProductResponse>(options);
  }

  @logStep('Get all products via API')
  async getAll(token: string): Promise<IResponse<IProductResponse>> {
    const options: IRequestOptions<IProduct> = {
      method: 'get',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Products,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    };
    return this.apiClient.send<IProduct, IProductResponse>(options);
  }

  @logStep('Update product via API')
  async update(id: string, product: IProduct, token: string): Promise<IResponse<IProductResponse>> {
    const options: IRequestOptions<IProduct> = {
      method: 'put',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Products + `${id}/`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: product
    };
    return this.apiClient.send<IProduct, IProductResponse>(options);
  }

  @logStep('Delete product via API')
  async delete(id: string, token: string): Promise<IResponse<IProductResponse>> {
    const options: IRequestOptions<IProduct> = {
      method: 'delete',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Products + `${id}/`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    };
    return this.apiClient.send<IProduct, IProductResponse>(options);
  }
}
