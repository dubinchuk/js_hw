import { HomePage } from './home.page.js';
import { AddNewProductPage } from './products/addNewProduct.page.js';
import { ProductsPage } from './products/products.page.js';
import { SignInPage } from './signIn.page.js';

export default {
  'Sign In': new SignInPage(),
  Home: new HomePage(),
  'Products List': new ProductsPage(),
  'Add New Product': new AddNewProductPage(),
};
