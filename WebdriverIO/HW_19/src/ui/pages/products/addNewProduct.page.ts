import { IProduct, PRODUCT_FIELDS } from '../../../data/types/product.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export class AddNewProductPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Add New Product "]';

  private readonly 'Name input' = '#inputName';
  private readonly 'Manufacturer dropdown' = 'select#inputManufacturer';
  private readonly 'Price input' = '#inputPrice';
  private readonly 'Amount input' = '#inputAmount';
  private readonly 'Notes textarea' = '#textareaNotes';
  private readonly 'Save New Product button' = '#save-new-product';

  private readonly 'Name input validation error' = '#error-inputName';
  private readonly 'Price input validation error' = '#error-inputPrice';
  private readonly 'Amount input validation error' = '#error-inputAmount';
  private readonly 'Notes input validation error' = '#error-textareaNotes';

  async fillInputs(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async clickOnSaveButton() {
    await this.click(this['Save New Product button']);
  }

  async getInputErrorLocator(field: PRODUCT_FIELDS) {
    return await this.findElement(this[`${field} input validation error`]);
  }

  async getSaveButton() {
    const saveButton = await this.waitForElement(this['Save New Product button'], 1000);
    return saveButton;
  }
}
