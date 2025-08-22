import { IProduct } from '../../../data/types/product.types.js';
import { PRODUCT_TOAST_STATUSES } from '../../../data/types/toastMessages.types.js';
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

  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.productsPage.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  async getCreatedProductData(productName: string) {
    const createdProductData = await this.productsPage.getDataByName(productName);
    return createdProductData;
  }

  async validateCreatedProductByDetails(expectedProduct: IProduct) {
    await this.productsPage.clickOnProductDetails(expectedProduct.name);
    await this.productsPage.waitForSpinnerToHide();
    await this.productDetailsModalPage.waitForOpened();
    await browser.pause(3000);
    const actualProduct = await this.productDetailsModalPage.getCreatedProduct();
    expect(_.omit(actualProduct, 'createdOn')).toEqual(expectedProduct);
    await this.productDetailsModalPage.clickOnCloseViewDetailsButton();
    await this.productsPage.waitForOpened();
  }

  async deleteProductByName(product: IProduct) {
    await this.productsPage.clickOnDeleteProduct(product.name);
    await this.deleteProductModalPage.waitForOpened();
    await this.deleteProductModalPage.clickOnDeleteProductButton();
    await this.productsPage.waitForSpinnerToHide();
    await this.salesPortalService.validateNotificationAndClose(PRODUCT_TOAST_STATUSES.DELETED);
    await this.productsPage.waitForOpened();
  }
}
