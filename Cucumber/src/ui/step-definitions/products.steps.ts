import { DataTable, Then, When, After } from '@wdio/cucumber-framework';
import { ProductsApiClient } from '../../api/clients/products.client.js';
import signInApiService from '../../api/services/signIn/signIn.service.js';
import { generateNewProduct } from '../../data/products/generateProduct.js';
import { ProductsListService } from '../services/products/products.service.js';
import { EditProductService } from '../services/products/editProduct.service.js';
import { IProduct } from '../../data/types/product.types.js';
import { STATUS_CODES } from '../../data/types/api.types.js';
import { Products } from '../../config/environment.js';
import { ProductDetailsService } from '../services/products/productDetails.service.js';

const productApi = new ProductsApiClient();
const productsListUIService = new ProductsListService();
const editProductUIService = new EditProductService();
const productDetails = new ProductDetailsService();

When(/^I create( [1-9]\d*)? product(s)? via API$/, async function (quantity: number, suffix: string) {
  const token = await signInApiService.signInAsAdminApi();
  if (quantity && suffix) {
    for (let i = 0; i < quantity; i++) {
      const productData = generateNewProduct();
      const productResponse = await productApi.create(productData, token);
      expect(productResponse.status).toBe(STATUS_CODES.CREATED);
      Products.add(productResponse.body.Product);
    }
  } else if ((quantity && !suffix) || (!quantity && suffix)) {
    throw new Error('Syntax error. Check your step!');
  } else {
    const productData = generateNewProduct();
    const productResponse = await productApi.create(productData, token);
    expect(productResponse.status).toBe(STATUS_CODES.CREATED);
    Products.add(productResponse.body.Product);
  }
});

Then(/^I delete product via API$/, async function () {
  const product = Products.get();
  const token = (await browser.getCookies('Authorization'))[0]?.value;
  const response = await productApi.delete(product._id, `Bearer ${token}`);
  expect(response.status).toBe(STATUS_CODES.DELETED);
});

Then(/^I delete products via API$/, async function () {
  const products = Products.getAll();
  const token = (await browser.getCookies('Authorization'))[0]?.value;
  for (const product of products) {
    const response = await productApi.delete(product._id, `Bearer ${token}`);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  }
});

When(/^I open 'Edit Product' page on 'Products List' page$/, async function () {
  const createdProduct = Products.get();
  await productsListUIService.openEditProductPage(createdProduct.name);
});

When(
  /^I open 'Product Details' modal page for product ([1-9]\d*) on 'Products List' page$/,
  async function (productNumber: number) {
    const createdProduct = Products.getAll()[productNumber - 1];
    await productsListUIService.openProductDetailsPage(createdProduct.name);
  }
);

When(/^I fill product inputs on 'Edit Product' page with following values:$/, async function (table: DataTable) {
  const userData = table.rowsHash();
  await editProductUIService.update(userData as Partial<IProduct>);

  Products.update({
    _id: Products.get()._id,
    ...userData,
    ...(userData.price && { price: +userData.price }),
    ...(userData.amount !== undefined && { amount: +userData.amount }),
  });
});

Then(/^I should see updated product in table on 'Products List' page$/, async function () {
  const product = Products.get();
  await productsListUIService.checkProductInTable(product);
});

Then(/^I should see product(s)? in table on 'Products List' page$/, async function (suffix: string) {
  if (!suffix) {
    const product = Products.get();
    await productsListUIService.checkProductInTable(product);
  } else {
    const products = Products.getAll();
    for (const product of products) {
      await productsListUIService.checkProductInTable(product);
    }
  }
});

Then(/^I should see product ([1-9]\d*) on 'Product Details' modal page$/, async function (productNumber: number) {
  const createdProduct = Products.getAll()[productNumber - 1];
  await productDetails.validateCreatedProductByDetails(createdProduct);
});

Then(/^I close 'Product Details' modal page$/, async function () {
  await productDetails.closeProductDetails();
});

After(async function () {
  const products = Products.getAll();
  if (products.length) {
    const token = (await browser.getCookies('Authorization'))[0]?.value;
    for (const product of products) {
      const response = await productApi.delete(product._id, `Bearer ${token}`);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
  }
});
