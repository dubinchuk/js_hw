import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { HomeService } from '../../services/home.service.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { ProductsListService } from '../../services/products/products.service.js';
import { SignInService } from '../../services/signIn.service.js';

describe('[UI] [Product] Smoke tests', () => {
  const signInService = new SignInService();
  const addProductService = new AddProductService();
  const homeService = new HomeService();
  const productsListService = new ProductsListService();

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await signInService.openSignInPage();
    await signInService.loginAsAdmin();
    await homeService.openProductsPage();
  });

  it('Product created and deleted', async () => {
    await productsListService.openAddNewProductPage();
    const product = generateNewProduct();
    await addProductService.create(product);
    await addProductService.validateProductCreatedNotification();
    await productsListService.validateCreatedProductByDetails(product);
    await productsListService.deleteProductByName(product);
  });
});
