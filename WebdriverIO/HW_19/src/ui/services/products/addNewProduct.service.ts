import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { ADD_NEW_PRODUCT_VALIDATION_MESSAGES } from '../../../data/types/inputsValidation.types.js';
import { IProduct, PRODUCT_FIELDS } from '../../../data/types/product.types.js';
import { PRODUCT_TOAST_STATUSES } from '../../../data/types/toastMessages.types.js';
import { logAction, logStep } from '../../../utils/report/decorator.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';
import { SalesPortalService } from '../salesPortal.service.js';

export class AddProductService {
  constructor(
    private productsPage = new ProductsPage(),
    private addNewProductPage = new AddNewProductPage(),
    private salesPortalService = new SalesPortalService()
  ) {}

  @logStep('Fill product inputs')
  async fillProductInputs(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputs(product);
  }

  @logStep('Get input error message')
  async getFieldValidationErrorMessage(field: PRODUCT_FIELDS) {
    const errorMessageLocator = await this.addNewProductPage.getInputErrorLocator(field);
    await expect(errorMessageLocator).toBeDisplayed();
    return await errorMessageLocator.getText();
  }

  @logStep('Verify input error message')
  async verifyValidationMessageByFieldName(fieldName: PRODUCT_FIELDS) {
    const actualErrorMessage = await this.getFieldValidationErrorMessage(fieldName);
    const expectedErrorMessage =
      ADD_NEW_PRODUCT_VALIDATION_MESSAGES[fieldName.toUpperCase() as keyof typeof ADD_NEW_PRODUCT_VALIDATION_MESSAGES];
    expect(actualErrorMessage).toBe(expectedErrorMessage);
  }

  @logStep('Check "Save New Product" button is disabled')
  async isSaveButtonDisabled() {
    const saveButton = await this.addNewProductPage.getSaveButton();
    await expect(saveButton).toBeDisabled();
  }

  @logAction('Verify invalid {text} input state')
  async verifyInvalidInputState(product: IProduct, fieldName: PRODUCT_FIELDS) {
    const inputText = product[fieldName.toLowerCase() as keyof IProduct];
    if (inputText !== '') {
      await this.verifyValidationMessageByFieldName(fieldName);
    }
    await this.isSaveButtonDisabled();
  }

  @logStep('Save new product')
  async save() {
    await this.addNewProductPage.clickOnSaveButton();
  }

  @logStep('Create product')
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
