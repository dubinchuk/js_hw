import { IProduct } from '../../../data/types/product.types.js';
import { PRODUCT_TOAST_STATUSES } from '../../../data/types/toastMessages.types.js';
import { logStep } from '../../../utils/report/decorator.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { DeleteProductModalPage } from '../../pages/products/deleteProductModal.page.js';
import { ProductDetailsModalPage } from '../../pages/products/productDetailsModal.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';
import { SalesPortalService } from '../salesPortal.service.js';
import _ from 'lodash';

export class ProductsListService {
  constructor(
    private productsPage = new ProductsPage(),
    private addNewProductPage = new AddNewProductPage(),
    private productDetailsModalPage = new ProductDetailsModalPage(),
    private salesPortalService = new SalesPortalService(),
    private deleteProductModalPage = new DeleteProductModalPage()
  ) {}

  @logStep('Open Add New Product page')
  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.productsPage.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  async getCreatedProductData(productName: string) {
    const createdProductData = await this.productsPage.getDataByName(productName);
    return createdProductData;
  }

  @logStep('Validate created product by details')
  async validateCreatedProductByDetails(expectedProduct: IProduct) {
    await this.productsPage.clickOnProductDetails(expectedProduct.name);
    await this.productsPage.waitForSpinnerToHide();
    await this.productDetailsModalPage.waitForOpened();
    await browser.pause(3000);
    const actualProduct = await this.productDetailsModalPage.getCreatedProduct();
    if (expectedProduct.notes === '') {
      expectedProduct.notes = '-';
    }
    expect(_.omit(actualProduct, 'createdOn')).toEqual(expectedProduct);
    await this.productDetailsModalPage.clickOnCloseViewDetailsButton();
    await this.productsPage.waitForOpened();
  }

  @logStep('Find created product in table')
  async isProductInTable(product: IProduct) {
    return await this.productsPage.findProductInTable(product.name);
  }

  @logStep('Check product is not in table')
  async isProductNotInTable(product: IProduct) {
    return await this.productsPage.findProductInTable(product.name, true);
  }

  @logStep('Validate created product in table')
  async validateCreatedProductInTable(expectedProduct: IProduct) {
    const actualProduct = await this.productsPage.getDataByName(expectedProduct.name);
    expect(actualProduct).toMatchObject(_.omit(expectedProduct, 'amount', 'notes'));
  }

  @logStep('Delete product by name')
  async deleteProductByName(product: IProduct) {
    await this.productsPage.clickOnDeleteProduct(product.name);
    await this.deleteProductModalPage.waitForOpened();
    await this.deleteProductModalPage.clickOnDeleteProductButton();
    await this.productsPage.waitForSpinnerToHide();
    await this.salesPortalService.validateNotificationAndClose(PRODUCT_TOAST_STATUSES.DELETED);
    await this.productsPage.waitForOpened();
    await this.isProductNotInTable(product);
  }
}
