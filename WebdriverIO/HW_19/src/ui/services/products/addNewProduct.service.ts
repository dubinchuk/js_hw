import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProduct } from '../../../data/types/product.types.js';
import { PRODUCT_TOAST_STATUSES } from '../../../data/types/toastMessages.types.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';
import { SalesPortalService } from '../salesPortal.service.js';

export class AddProductService {
  constructor(
    private productsPage = new ProductsPage(),
    private addNewProductPage = new AddNewProductPage(),
    private salesPortalService = new SalesPortalService()
  ) {}

  async fillProductInputs(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputs(product);
  }

  async save() {
    await this.addNewProductPage.clickOnSaveButton();
  }

  async create(product?: IProduct) {
    await this.fillProductInputs(product ?? generateNewProduct());
    await this.save();
    await this.addNewProductPage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }

  async validateProductCreatedNotification() {
    await this.salesPortalService.validateNotificationAndClose(PRODUCT_TOAST_STATUSES.CREATED);
  }
}
