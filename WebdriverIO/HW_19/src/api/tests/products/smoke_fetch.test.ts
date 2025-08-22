import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProductResponse } from '../../../data/types/product.types.js';
import { ProductsFetchApiClient } from '../../clients/product.clients.js';
import { validateResponse, validateSchema } from '../../../utils/validation/response.js';
import { createdProductSchema } from '../../../data/schema/product.schema.js';
import { STATUS_CODES } from '../../../data/types/api.types.js';
import { allProductsSchema } from '../../../data/schema/products.schema.js';
import { SignInFetchApiService } from '../../services/signIn/signIn.service.js';
import allure from '@wdio/allure-reporter';

describe('[API] [Products] Smoke', () => {
  describe('Create', () => {
    const productsApi = new ProductsFetchApiClient();
    const signInService = new SignInFetchApiService();
    let token = '';
    let createdProduct: IProductResponse;

    beforeEach(async () => {
      await signInService.signInAsAdminApi();
      token = signInService.getToken();
    });

    afterEach(async () => {
      if (createdProduct) {
        const id = createdProduct.Product._id;
        const response = await productsApi.delete(id, token);
        expect(response.status).toBe(STATUS_CODES.DELETED);
      }
    });

    it('Should create product', async () => {
      allure.addSeverity('blocker');
      const productData = generateNewProduct();
      const response = await productsApi.create(productData, token);
      createdProduct = response.body;
      validateResponse(response, STATUS_CODES.CREATED, true, null);
      validateSchema(response, createdProductSchema);
    });
  });

  describe('Get and Update', () => {
    const productsApi = new ProductsFetchApiClient();
    const signInService = new SignInFetchApiService();
    let token = '';
    let createdProduct: IProductResponse;
    let id: string;

    beforeEach(async () => {
      await signInService.signInAsAdminApi();
      token = signInService.getToken();
      const productData = generateNewProduct();
      const response = await productsApi.create(productData, token);
      createdProduct = response.body;
      id = createdProduct.Product._id;
    });

    afterEach(async () => {
      if (createdProduct) {
        const response = await productsApi.delete(id, token);
        expect(response.status).toBe(STATUS_CODES.DELETED);
      }
    });

    it('Should get product by ID', async () => {
      allure.addSeverity('critical');
      const response = await productsApi.getById(id, token);
      validateResponse(response, STATUS_CODES.OK, true, null);
    });

    it('Should get all products', async () => {
      allure.addSeverity('normal');
      const response = await productsApi.getAll(token);
      validateResponse(response, STATUS_CODES.OK, true, null);
      validateSchema(response, allProductsSchema);
    });

    it('Should update product', async () => {
      allure.addSeverity('critical');
      const updatedProduct = generateNewProduct();
      const response = await productsApi.update(id, updatedProduct, token);
      validateResponse(response, STATUS_CODES.OK, true, null);
    });
  });

  describe('Delete', () => {
    const productsApi = new ProductsFetchApiClient();
    const signInService = new SignInFetchApiService();
    let token = '';
    let createdProduct: IProductResponse;

    beforeEach(async () => {
      await signInService.signInAsAdminApi();
      token = signInService.getToken();
      const productData = generateNewProduct();
      const response = await productsApi.create(productData, token);
      createdProduct = response.body;
    });

    it('Should delete product', async () => {
      allure.addSeverity('critical');
      const id = createdProduct.Product._id;
      const response = await productsApi.delete(id, token);
      validateResponse(response, STATUS_CODES.DELETED, true, null);
    });
  });
});
