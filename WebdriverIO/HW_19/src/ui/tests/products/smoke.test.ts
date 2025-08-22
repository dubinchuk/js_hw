import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { HomeService } from '../../services/home.service.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { ProductsListService } from '../../services/products/products.service.js';
import { SignInService } from '../../services/signIn.service.js';
import allure from '@wdio/allure-reporter';

describe('[UI] [Product] Smoke tests', () => {
  allure.addFeature('Product creation feature');
  allure.addSuite('[Products] Smoke');
  const signInService = new SignInService();
  const addProductService = new AddProductService();
  const homeService = new HomeService();
  const productsListService = new ProductsListService();

  beforeEach(async () => {
    await signInService.openSignInPage();
    await signInService.loginAsAdmin();
    await homeService.openProductsPage();
  });

  afterEach(async () => {
    await signInService.signOut();
  });

  it('Product created and deleted', async () => {
    allure.addStory('User creates product with valid data via UI');
    allure.addSeverity('blocker');
    await productsListService.openAddNewProductPage();
    const product = generateNewProduct();
    await addProductService.create(product);
    await addProductService.validateProductCreatedNotification();
    await productsListService.validateCreatedProductByDetails(product);
    await productsListService.deleteProductByName(product);
  });
});
