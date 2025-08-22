import type { IProduct } from '../../../data/types/product.types.js';
import { logStep } from '../../../utils/report/decorator.js';
import { ProductDetailsModalPage } from '../../pages/products/productDetailsModal.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';
import _ from 'lodash';

export class ProductDetailsService {
  constructor(
    private productsPage = new ProductsPage(),
    private productDetailsModalPage = new ProductDetailsModalPage()
  ) {}

  @logStep('Validate created product by details')
  async validateCreatedProductByDetails(expectedProduct: IProduct) {
    const actualProduct = await this.productDetailsModalPage.getCreatedProduct();
    if (expectedProduct.notes === '') {
      expectedProduct.notes = '-';
    }
    expect(actualProduct).toMatchObject(_.omit(expectedProduct, 'createdOn', '_id'));
  }

  @logStep('Close Product Details button')
  async closeProductDetails() {
    await this.productDetailsModalPage.clickOnCloseProductDetailsButton();
    await this.productsPage.waitForOpened();
  }
}
