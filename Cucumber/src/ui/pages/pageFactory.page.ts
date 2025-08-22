import { HomePage } from './home.page.js';
import { AddNewProductPage } from './products/addNewProduct.page.js';
import { EditProductPage } from './products/editProduct.page.js';
import { ProductDetailsModalPage } from './products/productDetailsModal.page.js';
import { ProductsPage } from './products/products.page.js';
import { SignInPage } from './signIn.page.js';

export default {
  'Sign In': new SignInPage(),
  Home: new HomePage(),
  'Products List': new ProductsPage(),
  'Add New Product': new AddNewProductPage(),
  'Edit Product': new EditProductPage(),
  'Product Details': new ProductDetailsModalPage(),
};
