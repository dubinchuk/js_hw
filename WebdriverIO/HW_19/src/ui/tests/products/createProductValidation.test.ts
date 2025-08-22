import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { productData } from '../../../data/products/productData.js';
import { IProduct, PRODUCT_FIELDS } from '../../../data/types/product.types.js';
import { HomeService } from '../../services/home.service.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { ProductsListService } from '../../services/products/products.service.js';
import { SignInService } from '../../services/signIn.service.js';
import allure from '@wdio/allure-reporter';

describe('[UI] [Product] Create product validation', () => {
  allure.addFeature('Product fields validation');
  allure.addSuite('[Products] Add New Product fields validation');
  const signInService = new SignInService();
  const addProductService = new AddProductService();
  const homeService = new HomeService();
  const productsListService = new ProductsListService();
  let product: IProduct;

  beforeEach(async () => {
    await signInService.openSignInPage();
    await signInService.loginAsAdmin();
    await homeService.openProductsPage();
    await productsListService.openAddNewProductPage();
  });

  afterEach(async () => {
    await homeService.openSalesPortal();
    await homeService.openProductsPage();
    if (await productsListService.isProductInTable(product)) {
      await productsListService.deleteProductByName(product);
    }
    await signInService.signOut();
  });

  context('Tests with valid data', () => {
    allure.addStory('User creates product with valid data via UI');
    allure.addSeverity('blocker');
    for (const productName of productData.valid.name) {
      it(`Should create product with name: '${productName.description}'`, async () => {
        product = generateNewProduct({ name: productName.name });
        await addProductService.create(product);
        await addProductService.validateProductCreatedNotification();
        await productsListService.validateCreatedProductByDetails(product);
      });
    }

    for (const productPrice of productData.valid.price) {
      it(`Should create product with price: '${productPrice.description}'`, async () => {
        product = generateNewProduct({ price: productPrice.price });
        await addProductService.create(product);
        await addProductService.validateProductCreatedNotification();
        await productsListService.validateCreatedProductByDetails(product);
      });
    }
    for (const productAmount of productData.valid.amount) {
      it(`Should create product with amount: '${productAmount.description}'`, async () => {
        product = generateNewProduct({ amount: productAmount.amount });
        await addProductService.create(product);
        await addProductService.validateProductCreatedNotification();
        await productsListService.validateCreatedProductByDetails(product);
      });
    }

    for (const productNotes of productData.valid.notes) {
      it(`Should create product with notes: '${productNotes.description}'`, async () => {
        product = generateNewProduct({ notes: productNotes.notes });
        await addProductService.create(product);
        await addProductService.validateProductCreatedNotification();
        await productsListService.validateCreatedProductByDetails(product);
      });
    }
  });

  allure.addStory('User fills add new product inputs with invalid data via UI');
  allure.addSeverity('normal');
  context('Tests with invalid data', () => {
    for (const productName of productData.invalid.name) {
      it(`Should display error and disable 'Save New Product' button with name: '${productName.description}'`, async () => {
        product = generateNewProduct({ name: productName.name });
        await addProductService.fillProductInputs(product);
        await addProductService.verifyInvalidInputState(product, PRODUCT_FIELDS.NAME);
      });
    }

    for (const productPrice of productData.invalid.price) {
      it(`Should display error and disable 'Save New Product' button with price: '${productPrice.description}'`, async () => {
        product = generateNewProduct({ price: productPrice.price });
        await addProductService.fillProductInputs(product);
        await addProductService.verifyInvalidInputState(product, PRODUCT_FIELDS.PRICE);
      });
    }

    for (const productAmount of productData.invalid.amount) {
      it(`Should display error and disable 'Save New Product' button with amount: '${productAmount.description}'`, async () => {
        product = generateNewProduct({ amount: productAmount.amount });
        await addProductService.fillProductInputs(product);
        await addProductService.verifyInvalidInputState(product, PRODUCT_FIELDS.AMOUNT);
      });
    }

    for (const productNotes of productData.invalid.notes) {
      it(`Should display error and disable 'Save New Product' button with notes: '${productNotes.description}'`, async () => {
        product = generateNewProduct({ notes: productNotes.notes });
        await addProductService.fillProductInputs(product);
        await addProductService.verifyInvalidInputState(product, PRODUCT_FIELDS.NOTES);
      });
    }
  });
});
